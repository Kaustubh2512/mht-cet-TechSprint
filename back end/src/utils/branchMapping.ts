import csv from 'csvtojson';
import path from 'path';

// Maps 5-digit branch code to standardized group name
type BranchCode = string;
let branchCodeToStandard: Record<BranchCode, string> = {};
let standardToBranchCodes: Record<string, BranchCode[]> = {};

export async function loadBranchMapping() {
  const filePath = path.join(__dirname, '../../../pypy/standardized_branch_ids.csv');
  const jsonArray = await csv().fromFile(filePath);

  branchCodeToStandard = {};
  standardToBranchCodes = {};

  for (const row of jsonArray) {
    const group = row.group_name;
    // Expecting row.branch_codes to be semicolon-separated 5-digit codes
    const codes: string[] = row.branch_codes
      ? row.branch_codes.split(';').map((id: string) => id.trim())
      : [];
    for (const code of codes) {
      branchCodeToStandard[code] = group;
    }
    if (!standardToBranchCodes[group]) {
      standardToBranchCodes[group] = [];
    }
    standardToBranchCodes[group].push(...codes);
  }
}

// Given a full branch_id (e.g., 0100219110), return the standardized group name
export function getStandardizedBranchId(branch_id: string) {
  const code = branch_id.slice(-5);
  return branchCodeToStandard[code];
}

// Given a standardized group, return all 5-digit branch codes
export function getBranchCodesForStandard(standardized_branch_id: string) {
  return standardToBranchCodes[standardized_branch_id] || [];
}

// Given a standardized group and a list of full branch_ids, return all full branch_ids that match the group's codes
export function getBranchIdsForStandardFromList(standardized_branch_id: string, allBranchIds: string[]) {
  const codes = new Set(getBranchCodesForStandard(standardized_branch_id));
  return allBranchIds.filter(id => codes.has(id.slice(-5)));
}

export function getAllStandardizedBranchIds(): string[] {
  return Object.keys(standardToBranchCodes);
} 