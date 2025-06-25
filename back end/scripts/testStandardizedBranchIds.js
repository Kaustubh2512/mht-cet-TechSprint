const { loadBranchMapping, getAllStandardizedBranchIds } = require('../src/utils/branchMapping');

async function test() {
  await loadBranchMapping();
  const allStandardizedBranchIds = getAllStandardizedBranchIds();
  console.log('All standardized_branch_id values:');
  console.log(allStandardizedBranchIds);
}

test(); 