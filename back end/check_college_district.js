const fs = require('fs');
const path = require('path');

// Load college details
const collegeDetailsPath = path.join(__dirname, 'college_details_padded.json');
const collegeDetails = JSON.parse(fs.readFileSync(collegeDetailsPath, 'utf-8'));

// Find college with code 06991
const college = collegeDetails.find(c => String(c.college_code).padStart(5, '0') === '06991');

if (college) {
  console.log('College found:');
  console.log('College Code:', college.college_code);
  console.log('College Name:', college.institute_name);
  console.log('District:', college.District);
  console.log('Home University:', college["Home University"]);
} else {
  console.log('College with code 06991 not found');
}

// Also check for COEP (16006)
const coep = collegeDetails.find(c => String(c.college_code).padStart(5, '0') === '16006');
if (coep) {
  console.log('\nCOEP found:');
  console.log('College Code:', coep.college_code);
  console.log('College Name:', coep.institute_name);
  console.log('District:', coep.District);
  console.log('Home University:', coep["Home University"]);
} 