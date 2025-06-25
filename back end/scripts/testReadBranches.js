const fs = require('fs');
const path = '/Users/yuvi/mht-cet-tech-tmp/branches.csv';

try {
  const data = fs.readFileSync(path, 'utf-8');
  console.log('File read successfully. First 500 chars:');
  console.log(data.slice(0, 500));
} catch (err) {
  console.error('Failed to read file:', err);
} 