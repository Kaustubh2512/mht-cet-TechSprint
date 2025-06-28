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

console.log('=== MUMBAI METROPOLITAN TEST ===');
console.log('Colleges mapped to Mumbai Metropolitan:');
let mumbaiMetroCount = 0;
for (const [code, details] of collegeDetails.entries()) {
  if (details.district === 'Mumbai Metropolitan') {
    console.log(`${code}: ${details.originalDistrict} -> ${details.district}`);
    mumbaiMetroCount++;
  }
}
console.log(`Total colleges in Mumbai Metropolitan: ${mumbaiMetroCount}`);

console.log('\n=== ORIGINAL MUMBAI DISTRICTS ===');
console.log('Colleges in original Mumbai districts:');
let mumbaiCityCount = 0;
let mumbaiSuburbanCount = 0;
let thaneCount = 0;

for (const [code, details] of collegeDetails.entries()) {
  if (details.originalDistrict === 'Mumbai City') {
    console.log(`${code}: ${details.originalDistrict}`);
    mumbaiCityCount++;
  } else if (details.originalDistrict === 'Mumbai Suburban') {
    console.log(`${code}: ${details.originalDistrict}`);
    mumbaiSuburbanCount++;
  } else if (details.originalDistrict === 'Thane') {
    console.log(`${code}: ${details.originalDistrict}`);
    thaneCount++;
  }
}

console.log(`\nMumbai City: ${mumbaiCityCount} colleges`);
console.log(`Mumbai Suburban: ${mumbaiSuburbanCount} colleges`);
console.log(`Thane: ${thaneCount} colleges`); 