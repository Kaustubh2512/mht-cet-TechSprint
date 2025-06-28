const fs = require('fs');
const path = require('path');

// Load college details data for district-based filtering
const collegeDetailsPath = path.join(__dirname, 'college_details.csv');
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

loadCollegeDetails();

// Test the Mumbai Metropolitan logic
console.log('=== TESTING MUMBAI METROPOLITAN LOGIC ===');

const college_district = 'Mumbai Metropolitan';
const targetDistrict = college_district === 'Mumbai Metropolitan' 
  ? ['Mumbai City', 'Mumbai Suburban', 'Thane'] 
  : [college_district];

console.log('Target districts:', targetDistrict);

const districtCollegeCodes = [];
for (const [collegeCode, details] of collegeDetails.entries()) {
  if (targetDistrict.includes(details.originalDistrict)) {
    const paddedCode = collegeCode.length === 4 ? collegeCode.padStart(5, '0') : collegeCode;
    districtCollegeCodes.push(paddedCode);
  }
}

console.log('Found college codes:', districtCollegeCodes.length);
console.log('Sample codes:', districtCollegeCodes.slice(0, 10));

// Check if 03012 (VJTI) is included
const vjtiCode = '03012';
const paddedVjtiCode = vjtiCode.length === 4 ? vjtiCode.padStart(5, '0') : vjtiCode;
console.log(`VJTI (${paddedVjtiCode}) included:`, districtCollegeCodes.includes(paddedVjtiCode)); 