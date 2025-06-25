import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import Cutoff from '../models/Cutoff';
import { getStandardizedBranchId } from '../utils/branchMapping';

// Load region and home university mappings at startup
const regionPath = path.join(__dirname, '../../grouped_by_region.json');
const districtToUniPath = path.resolve(__dirname, '../../district_to_uni.json');
console.log('districtToUniPath:', districtToUniPath);
const regionData = JSON.parse(fs.readFileSync(regionPath, 'utf-8'));
const districtToUni = JSON.parse(fs.readFileSync(districtToUniPath, 'utf-8'));

export interface JsonPredictionInput {
  branch_ids: string[];
  percentile: number;
  category: string;
  gender: string;
  region: string;
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

export async function predictCollegesFromJson(input: JsonPredictionInput): Promise<JsonCollegePrediction[]> {
  const { branch_ids, percentile, category, gender, region, district } = input;

  // 1. Get all college codes for the selected region
  const regionCollegesRaw = regionData[region] || {};
  const regionColleges: Record<string, any> = {};
  for (const code of Object.keys(regionCollegesRaw)) {
    regionColleges[code.padStart(5, '0')] = regionCollegesRaw[code];
  }
  const regionCollegeCodesRaw = Object.keys(regionColleges);
  const regionCollegeCodes = regionCollegeCodesRaw; // already padded

  // 2. Find all cutoffs for branch_ids where college_code is in regionCollegeCodes
  const docs: any[] = await Cutoff.find({
    branch_id: { $in: branch_ids },
    college_code: { $in: regionCollegeCodes }
  }).lean();

  // Debug logs to trace matching docs
  console.log('DEBUG: Matching docs branch_ids:', branch_ids);
  console.log('DEBUG: Matching docs college_codes:', regionCollegeCodes);
  console.log('DEBUG: Docs returned:', docs.map(d => ({ branch_id: d.branch_id, college_code: d.college_code, college_name: d.college_name })));

  // 3. Get user's home university from district
  const userHomeUnis = districtToUni[district] || [];

  // 4. Aggregate all matching cutoffs
  let allCutoffs: JsonCollegePrediction[] = [];
  for (const doc of docs) {
    const d: any = doc;
    if (!d.college_code || !d.college_name || !d.branch_name || !Array.isArray(d.cutoffs)) {
      continue;
    }
    const collegeInfo = regionColleges[String(d.college_code).trim()];
    if (!collegeInfo) {
      continue;
    }
    const isAutonomous =
      collegeInfo.autonomy && collegeInfo.autonomy.toLowerCase() === 'autonomous';
    const collegeHomeUni = collegeInfo.home_university;

    for (const cutoff of d.cutoffs) {
      if (!cutoff || typeof cutoff !== 'object') continue;
      const code = cutoff.category_code;
      const seatType = cutoff.seat_type;
      if (typeof code !== 'string' || typeof seatType !== 'string') continue;
      // Debug for NBN Sinhgad
      if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
        console.log('DEBUG: NBN Sinhgad cutoff:', { code, seatType, percentile: cutoff.percentile });
      }
      // --- Gender logic ---
      const startChar = code[0];
      if (gender === 'Male' && startChar !== 'G') {
        if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
          console.log('DEBUG: NBN Sinhgad - filtered out by gender:', { code });
        }
        continue;
      }
      if (gender === 'Female' && !(startChar === 'G' || startChar === 'L')) {
        if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
          console.log('DEBUG: NBN Sinhgad - filtered out by gender:', { code });
        }
        continue;
      }
      // --- Category logic ---
      if (category === 'OPEN' || category === 'General') {
        if (!code.includes('OPEN')) {
          if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
            console.log('DEBUG: NBN Sinhgad - filtered out by category:', { code });
          }
          continue;
        }
      } else {
        if (!(code.includes(category) || code.includes('OPEN'))) {
          if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
            console.log('DEBUG: NBN Sinhgad - filtered out by category:', { code });
          }
          continue;
        }
      }
      // --- Seat type logic ---
      const seatCode = code.slice(-1);
      if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune") {
        console.log('DEBUG: NBN Sinhgad seat check:', {
          userHomeUnis,
          collegeHomeUni,
          seatCode,
          code,
          allowed: userHomeUnis.includes(collegeHomeUni)
        });
      }
      if (isAutonomous && seatCode !== 'S') {
        if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677237210") {
          console.log('DEBUG: NBN Sinhgad - filtered out by seat type (autonomous):', { code });
        }
        continue;
      }
      if (!isAutonomous) {
        if (userHomeUnis.includes(collegeHomeUni)) {
          if (seatCode !== 'H') {
            if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677237210") {
              console.log('DEBUG: NBN Sinhgad - filtered out by seat type (home uni):', { code });
            }
            continue;
          }
        } else {
          if (seatCode !== 'O') {
            if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677237210") {
              console.log('DEBUG: NBN Sinhgad - filtered out by seat type (other uni):', { code });
            }
            continue;
          }
        }
      }
      // --- Percentile logic ---
      if (typeof cutoff.percentile !== 'number' || cutoff.percentile > percentile) {
        if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
          console.log('DEBUG: NBN Sinhgad - filtered out by percentile:', { code, percentile: cutoff.percentile });
        }
        continue;
      }
      // --- Add to results ---
      if (d.college_name === "NBN Sinhgad Technical Institutes Campus, Pune" && d.branch_id === "0677224610") {
        console.log('DEBUG: NBN Sinhgad - ADDED to results:', { code, seatType, percentile: cutoff.percentile });
      }
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
  // 6. Deduplicate: for each unique (collegeName, branch, branchGroup, collegeType), keep only the highest cutoff
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