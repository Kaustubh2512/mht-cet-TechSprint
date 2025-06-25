const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../branchwise_cutoffsR1_debug.json');
const outputPath = path.join(__dirname, '../mongo_cutoffs.json');

const raw = fs.readFileSync(inputPath, 'utf-8');
const data = JSON.parse(raw);

const arr = Object.entries(data).map(([branch_id, obj]) => ({
  branch_id,
  ...obj
}));

fs.writeFileSync(outputPath, JSON.stringify(arr, null, 2), 'utf-8');

console.log(`Converted to array format and saved as ${outputPath}`); 