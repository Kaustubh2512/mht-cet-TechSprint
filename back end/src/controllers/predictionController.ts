import { Request, Response } from 'express';
import { predictCollegesFromJson } from '../services/jsonPredictionService';
import { getBranchCodesForStandard, getBranchIdsForStandardFromList, getStandardizedBranchId } from '../utils/branchMapping';
import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';

// Load branch_id to branch_name map for JEE
let branchIdToName: Record<string, string> = {};
const branchCsvPath = path.join(process.cwd(), 'branches.csv');
console.log('DEBUG: __dirname:', __dirname);
console.log('DEBUG: branchCsvPath:', branchCsvPath);
function loadBranchIdToName() {
  return new Promise<void>((resolve, reject) => {
    const result: Record<string, string> = {};
    fs.createReadStream(branchCsvPath)
      .pipe(csvParser())
      .on('data', (row: any) => {
        if (row.branch_id && row.branch_name) {
          result[row.branch_id] = row.branch_name;
        }
      })
      .on('end', () => {
        branchIdToName = result;
        resolve();
      })
      .on('error', (err: Error) => {
        console.error('Failed to load branches.csv for JEE branch name mapping:', err);
        reject(err);
      });
  });
}
loadBranchIdToName();

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { branch_id, branch_code, standardized_branch_id, standardized_branch_ids, percentile, category, gender, college_district, district } = req.body;

    // Validate required fields
    if (
      (!branch_id && !standardized_branch_id && !branch_code && (!standardized_branch_ids || !Array.isArray(standardized_branch_ids) || standardized_branch_ids.length === 0)) ||
      percentile === undefined || !category || !gender || !college_district || !district
    ) {
      return res.status(400).json({
        success: false,
        message: 'branch_id, standardized_branch_id, branch_code, standardized_branch_ids, percentile, category, gender, college_district, and district are required'
      });
    }

    // Get all relevant branch_ids
    let branch_ids: string[] = [];
    const CutoffModel = (await import('../models/Cutoff')).default;
    const allBranchIds = await CutoffModel.distinct('branch_id');
    if (Array.isArray(standardized_branch_ids) && standardized_branch_ids.length > 0) {
      // Multi-branch priority logic
      for (const stdId of standardized_branch_ids) {
        const ids = getBranchIdsForStandardFromList(stdId, allBranchIds);
        branch_ids.push(...ids);
      }
    } else if (standardized_branch_id) {
      branch_ids = getBranchIdsForStandardFromList(standardized_branch_id, allBranchIds);
    } else if (branch_code && branch_code.length === 5) {
      branch_ids = allBranchIds.filter(id => id.endsWith(branch_code));
    } else if (branch_id && branch_id.length === 10) {
      branch_ids = [branch_id];
    }
    if (branch_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No branch_ids found for prediction.'
      });
    }
    const predictions = await predictCollegesFromJson({
      branch_ids: branch_ids,
      percentile: percentile,
      category: category,
      gender: gender,
      college_district: college_district,
      district: district
    });
    return res.status(200).json({
      success: true,
      data: predictions
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating predictions'
    });
  }
};

export const predictCollegesJEE = async (req: Request, res: Response) => {
  try {
    const { percentile, region, standardized_branch_ids } = req.body;
    if (
      percentile === undefined ||
      !region ||
      !Array.isArray(standardized_branch_ids) ||
      standardized_branch_ids.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'percentile, region, and standardized_branch_ids are required'
      });
    }
    // Load region data
    const regionPath = path.join(__dirname, '../../grouped_by_region.json');
    const regionData = JSON.parse(fs.readFileSync(regionPath, 'utf-8'));
    const regionCollegesRaw = regionData[region] || {};
    const regionColleges: Record<string, any> = {};
    for (const code of Object.keys(regionCollegesRaw)) {
      regionColleges[code.padStart(5, '0')] = regionCollegesRaw[code];
    }
    const regionCollegeCodes = Object.keys(regionColleges);
    // Load JEE merit list
    const jeePath = path.join(__dirname, '../../jee_main_merit_list.json');
    const jeeData = JSON.parse(fs.readFileSync(jeePath, 'utf-8'));
    // Build set of allowed branch codes (last 5 digits of Choice Code) from all selected groups
    const { getBranchCodesForStandard } = await import('../utils/branchMapping');
    let allowedBranchCodes = new Set();
    for (const stdId of standardized_branch_ids) {
      for (const code of getBranchCodesForStandard(stdId)) {
        allowedBranchCodes.add(code);
      }
    }
    // Filter JEE data
    let results = jeeData.filter((item: any) => {
      if (item['Merit Exam'] !== 'JEE(Main)-2024') return false;
      const code = String(item['Choice Code']);
      const collegeCode = code.slice(0, 5);
      const branchCode = code.slice(-5);
      if (!regionCollegeCodes.includes(collegeCode)) return false;
      if (!allowedBranchCodes.has(branchCode)) return false;
      const itemPercentile = parseFloat(item['Percentile']);
      if (isNaN(itemPercentile) || itemPercentile > percentile) return false;
      return true;
    });
    // Map to output format and dedupe by (college, branch, branchGroup)
    const dedupeMap = new Map();
    for (const item of results) {
      const code = String(item['Choice Code']);
      const collegeCode = code.slice(0, 5);
      const branchCode = code.slice(-5);
      const collegeInfo = regionColleges[collegeCode] || {};
      // Try to get branch name from regionColleges or fallback to branchCode
      let branchName = branchCode;
      if (collegeInfo && collegeInfo.branches && typeof collegeInfo.branches === 'object') {
        // If branches info exists, try to get the name
        branchName = collegeInfo.branches[branchCode]?.branch_name || branchCode;
      }
      const branchGroup = getStandardizedBranchId(code);
      const key = `${collegeCode}|${branchCode}|${branchGroup}`;
      const percentileVal = parseFloat(item['Percentile']);
      if (!dedupeMap.has(key) || percentileVal > dedupeMap.get(key).cutoff) {
        // In predictCollegesJEE, set branch name using branchIdToName
        branchName = branchIdToName[code] || branchCode;
        dedupeMap.set(key, {
          collegeName: collegeInfo.institute_name || collegeCode,
          branch: branchName,
          branchGroup,
          location: '',
          collegeType: '',
          probability: 1,
          cutoff: percentileVal,
          seatType: '',
          rank: parseInt(item['Rank']) || 0
        });
      }
    }
    const deduped = Array.from(dedupeMap.values());
    deduped.sort((a, b) => b.cutoff - a.cutoff);
    return res.status(200).json({
      success: true,
      data: deduped.slice(0, 15)
    });
  } catch (error) {
    console.error('JEE Prediction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating JEE predictions'
    });
  }
}; 