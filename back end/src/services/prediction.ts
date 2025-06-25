import Cutoff from '../models/Cutoff';
import { getBranchIdsForStandardFromList } from '../utils/branchMapping';

export interface PredictionInput {
  branch_id?: string;
  standardized_branch_id?: string;
  percentile: number;
  category?: string;
  gender?: string;
}

export interface CollegePrediction {
  collegeName: string;
  branch: string;
  location: string;
  collegeType: string;
  probability: number;
  cutoff: number;
  category: string;
}

export async function predictColleges(input: PredictionInput): Promise<CollegePrediction[]> {
  const { branch_id, standardized_branch_id, percentile, category, gender } = input;

  let branchIds: string[] = [];
  if (standardized_branch_id) {
    // Fetch all distinct branch_ids from the database
    const allBranchIds: string[] = await Cutoff.distinct('branch_id');
    branchIds = getBranchIdsForStandardFromList(standardized_branch_id, allBranchIds);
    console.log('branchIds for', standardized_branch_id, ':', branchIds);
    if (branchIds.length === 0) {
      console.log('No branch_ids found for standardized_branch_id:', standardized_branch_id);
      return [];
    }
  } else if (branch_id) {
    branchIds = [branch_id];
  } else {
    console.log('No branch_id or standardized_branch_id provided');
    return [];
  }

  // Debug: log the query
  console.log('Prediction query:', { branchIds, percentile, category, gender });

  // Special handling for TFWS, EWS, ORPHAN
  if (category === 'TFWS') {
    // Only show TFWS cutoffs
    const results = await Cutoff.find({
      branch_id: { $in: branchIds },
      percentile: { $lte: percentile },
      category_code: 'TFWS'
    })
      .sort({ percentile: -1 })
      .lean();
    return results.map((item: any) => ({
      collegeName: item.college_name,
      branch: item.branch_name,
      location: '',
      collegeType: item.seat_type || '',
      probability: 1,
      cutoff: item.percentile,
      category: item.category_code
    }));
  } else if (category === 'EWS' || category === 'ORPHAN') {
    // Only show EWS or ORPHAN cutoffs
    const results = await Cutoff.find({
      branch_id: { $in: branchIds },
      percentile: { $lte: percentile },
      category_code: category
    })
      .sort({ percentile: -1 })
      .lean();
    return results.map((item: any) => ({
      collegeName: item.college_name,
      branch: item.branch_name,
      location: '',
      collegeType: item.seat_type || '',
      probability: 1,
      cutoff: item.percentile,
      category: item.category_code
    }));
  } else {
    // Gender-aware, category-aware filtering
    // Get all unique category codes from the DB
    const allCategoryCodes: string[] = await Cutoff.distinct('category_code');
    let allowedPrefixes: string[] = [];
    if (gender === 'Female') allowedPrefixes = ['G', 'L'];
    else allowedPrefixes = ['G'];

    // Build regex for category
    let categoryPattern = category || 'OPEN';
    if (categoryPattern === 'General') categoryPattern = 'OPEN';
    if (categoryPattern === 'NT') categoryPattern = 'NT'; // matches NT1, NT2, NT3, NT4
    if (categoryPattern === 'VJ') categoryPattern = 'VJ';
    if (categoryPattern === 'SEBC') categoryPattern = 'SEBC';
    if (categoryPattern === 'OBC') categoryPattern = 'OBC';
    if (categoryPattern === 'SC') categoryPattern = 'SC';
    if (categoryPattern === 'ST') categoryPattern = 'ST';

    // Build allowed codes
    const allowedCodes = allCategoryCodes.filter(code => {
      // Exclude PWD and DEF
      if (code.startsWith('PWD') || code.startsWith('DEF')) return false;
      // Only allow G/L prefix as per gender
      if (!allowedPrefixes.some(prefix => code.startsWith(prefix))) return false;
      // Category match
      if (categoryPattern === 'NT') return /NT/.test(code);
      if (categoryPattern === 'VJ') return /VJ/.test(code);
      if (categoryPattern === 'SEBC') return /SEBC/.test(code);
      if (categoryPattern === 'OBC') return /OBC/.test(code);
      if (categoryPattern === 'SC') return /SC/.test(code);
      if (categoryPattern === 'ST') return /ST/.test(code);
      if (categoryPattern === 'OPEN') return /OPEN/.test(code);
      return false;
    });

    if (allowedCodes.length === 0) {
      console.log('No allowed category codes for', category, gender);
      return [];
    }

    // Query the Cutoff collection
    const results = await Cutoff.find({
      branch_id: { $in: branchIds },
      percentile: { $lte: percentile },
      category_code: { $in: allowedCodes }
    })
      .sort({ percentile: -1 })
      .lean();

    // Group by college+branch+seat_type+category_code
    const grouped: Record<string, any> = {};
    results.forEach(item => {
      const key = `${item.college_name}|${item.branch_name}|${item.seat_type}|${item.category_code}`;
      if (!grouped[key]) grouped[key] = item;
    });

    // Just sort all by percentile descending, no category priority
    const sorted = Object.values(grouped).sort((a: any, b: any) => b.percentile - a.percentile);

    const predictions: CollegePrediction[] = sorted.slice(0, 15).map((item: any) => ({
      collegeName: item.college_name,
      branch: item.branch_name,
      location: '',
      collegeType: item.seat_type || '',
      probability: 1,
      cutoff: item.percentile,
      category: item.category_code
    }));

    // Debug: log the number of results
    console.log('Prediction results found:', predictions.length);

    return predictions;
  }
} 