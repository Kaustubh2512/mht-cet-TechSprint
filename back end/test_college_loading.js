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
    
    const columns = line.split(',');
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

console.log('College 6772 details:', collegeDetails.get('6772'));
console.log('All Pune colleges:');
for (const [code, details] of collegeDetails.entries()) {
  if (details.district === 'Pune') {
    console.log(`${code}: ${details.originalDistrict} - ${details.autonomy_status} - ${details.home_university}`);
  }
} 