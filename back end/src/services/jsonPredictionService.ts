import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import Cutoff from '../models/Cutoff';
import { getStandardizedBranchId } from '../utils/branchMapping';

// Load college details data for district-based filtering
const collegeDetailsPath = path.join(__dirname, '../../college_details.csv');
const collegeDetails = new Map();

// Load college details from CSV
function loadCollegeDetails() {
  const csvData = fs.readFileSync(collegeDetailsPath, 'utf-8');
  const lines = csvData.split('\n');
  
  for (let i = 1; i < lines.length; i++) { // Skip header
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parsing that handles quoted fields
    const columns = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        columns.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    columns.push(current.trim()); // Add the last column
    
    if (columns.length >= 8) {
      const collegeCode = columns[0];
      const district = columns[3];
      const autonomyStatus = columns[5];
      const homeUniversity = columns[7];
      
      // Group Mumbai City, Mumbai Suburban, and Thane as "Mumbai Metropolitan"
      let mappedDistrict = district;
      if (district === 'Mumbai City' || district === 'Mumbai Suburban' || district === 'Thane') {
        mappedDistrict = 'Mumbai Metropolitan';
      }
      
      collegeDetails.set(collegeCode, {
        district: mappedDistrict,
        originalDistrict: district,
        autonomy_status: autonomyStatus,
        home_university: homeUniversity
      });
    }
  }
}

// Load college details on module import
loadCollegeDetails();

export interface JsonPredictionInput {
  branch_ids: string[];
  percentile: number;
  category: string;
  gender: string;
  college_district: string; // Changed from region to college_district
  district: string;
}

export interface JsonCollegePrediction {
  collegeName: string;
  branch: string;
  branchGroup: string;
  location: string;
  collegeType: string;
  probability: number;
  cutoff: number;
  category: string;
  seatType: string;
  rank: number;
}

// Helper function to pad only 4-digit codes
function padCollegeCode(code: string) {
  return code.length === 4 ? code.padStart(5, '0') : code;
}

export async function predictCollegesFromJson(input: JsonPredictionInput): Promise<JsonCollegePrediction[]> {
  const { branch_ids, percentile, category, gender, college_district, district } = input;

  // 1. Get all college codes for the selected district
  const districtCollegeCodes: string[] = [];
  
  // Handle Mumbai Metropolitan grouping
  const targetDistrict = college_district === 'Mumbai Metropolitan' 
    ? ['Mumbai City', 'Mumbai Suburban', 'Thane'] 
    : [college_district];
  
  for (const [collegeCode, details] of collegeDetails.entries()) {
    if (targetDistrict.includes(details.originalDistrict)) {
      districtCollegeCodes.push(padCollegeCode(collegeCode));
    }
  }

  console.log('DEBUG: Target district:', targetDistrict);
  console.log('DEBUG: Found college codes:', districtCollegeCodes);
  console.log('DEBUG: Branch IDs:', branch_ids);
  console.log('DEBUG: Looking for NBN Sinhgad (6772):', districtCollegeCodes.includes('06772'));

  // 2. Find all cutoffs for branch_ids where college_code is in districtCollegeCodes
  const docs: any[] = await Cutoff.find({
    branch_id: { $in: branch_ids },
    college_code: { $in: districtCollegeCodes }
  }).lean();

  console.log('DEBUG: Found documents:', docs.length);

  // 3. Get user's home university from district
  const districtToUniPath = path.resolve(__dirname, '../../district_to_uni.json');
  const districtToUni = JSON.parse(fs.readFileSync(districtToUniPath, 'utf-8'));
  const userHomeUnis = districtToUni[district] || [];

  // 4. Aggregate all matching cutoffs
  let allCutoffs: JsonCollegePrediction[] = [];
  for (const doc of docs) {
    const d: any = doc;
    if (!d.college_code || !d.college_name || !d.branch_name || !Array.isArray(d.cutoffs)) {
      continue;
    }
    
    // Get college info from college details
    const collegeInfo = collegeDetails.get(d.college_code.replace(/^0+/, '')) || {}; // Remove leading zeros to match CSV
    const isAutonomous = collegeInfo.autonomy_status === 'Autonomous';
    const collegeHomeUni = collegeInfo.home_university || '';

    for (const cutoff of d.cutoffs) {
      if (!cutoff || typeof cutoff !== 'object') continue;
      const code = cutoff.category_code;
      const seatType = cutoff.seat_type;
      if (typeof code !== 'string' || typeof seatType !== 'string') continue;
      
      // --- Gender logic ---
      const startChar = code[0];
      // Skip gender filtering for TFWS and EWS since they don't follow the gender prefix pattern
      if (code !== 'TFWS' && code !== 'EWS') {
        if (gender === 'Male' && startChar !== 'G') continue;
        if (gender === 'Female' && !(startChar === 'G' || startChar === 'L')) continue;
      }
      
      // --- Category logic ---
      if (category === 'EWS' || category === 'TFWS') {
        if (!code.toUpperCase().includes(category.toUpperCase())) continue;
      } else if (category === 'OPEN' || category === 'General') {
        if (!code.includes('OPEN')) continue;
      } else {
        if (!(code.includes(category) || code.includes('OPEN'))) continue;
      }
      
      // --- Seat type logic ---
      const seatCode = code.slice(-1);
      
      // Special handling for TFWS and EWS - they are always state-level seats
      if (category === 'TFWS' || category === 'EWS') {
        if (seatCode !== 'S') continue;
      } else if (isAutonomous && seatCode !== 'S') {
        continue;
      } else if (!isAutonomous) {
        if (userHomeUnis.includes(collegeHomeUni)) {
          if (seatCode !== 'H') continue;
        } else {
          if (seatCode !== 'O') continue;
        }
      }
      
      // --- Percentile logic ---
      if (typeof cutoff.percentile !== 'number' || cutoff.percentile > percentile) continue;
      
      // --- Add to results ---
      allCutoffs.push({
        collegeName: d.college_name,
        branch: d.branch_name,
        branchGroup: getStandardizedBranchId(d.branch_id),
        location: '',
        collegeType: seatType,
        probability: 1,
        cutoff: cutoff.percentile,
        category: code,
        seatType: seatType,
        rank: cutoff.rank ?? 0
      });
    }
  }
  
  // 5. Deduplicate: for each unique (collegeName, branch, branchGroup, collegeType), keep only the highest cutoff
  const uniqueMap = new Map();
  for (const item of allCutoffs) {
    const key = `${item.collegeName}|${item.branch}|${item.branchGroup}|${item.collegeType}`;
    if (!uniqueMap.has(key) || item.cutoff > uniqueMap.get(key).cutoff) {
      uniqueMap.set(key, item);
    }
  }
  const deduped = Array.from(uniqueMap.values());
  deduped.sort((a, b) => b.cutoff - a.cutoff);
  return deduped.slice(0, 15);
} 