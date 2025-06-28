const fs = require('fs');

// Load the JSON file
const filePath = './branchwise_cutoffsR1_debug.json';
console.log(`Loading file: ${filePath}`);

try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log('File loaded successfully.');
  
  const collegesWithTFWS = new Set();
  const collegesWithEWS = new Set();
  
  // Iterate through all branch records
  Object.keys(data).forEach(branchId => {
    const record = data[branchId];
    const collegeCode = record.college_code;
    const collegeName = record.college_name;
    
    // Check if this branch has TFWS or EWS cutoffs
    if (record.cutoffs) {
      record.cutoffs.forEach(cutoff => {
        if (cutoff.category_code === 'TFWS') {
          collegesWithTFWS.add(`${collegeCode} - ${collegeName}`);
        }
        if (cutoff.category_code === 'EWS') {
          collegesWithEWS.add(`${collegeCode} - ${collegeName}`);
        }
      });
    }
  });
  
  console.log('\n=== COLLEGES WITH TFWS DATA ===');
  console.log(`Total colleges with TFWS: ${collegesWithTFWS.size}`);
  console.log('Colleges with TFWS:');
  Array.from(collegesWithTFWS).sort().forEach(college => {
    console.log(`  ${college}`);
  });
  
  console.log('\n=== COLLEGES WITH EWS DATA ===');
  console.log(`Total colleges with EWS: ${collegesWithEWS.size}`);
  console.log('Colleges with EWS:');
  Array.from(collegesWithEWS).sort().forEach(college => {
    console.log(`  ${college}`);
  });
  
  // Check which of these colleges are in the Mumbai region mapping
  const mumbaiColleges = [
    '3014', '3033', '3025', '3036', '3012', '3035', '3042', '3143', '3139', '3148',
    '3146', '3154', '3147', '3176', '3135', '3175', '3184', '3187', '3182', '3183',
    '3188', '3192', '3189', '3185', '3190', '3193', '3197', '3196', '3194', '3200',
    '3198', '3203', '3202', '3199', '3204', '3201', '3208', '3206', '3207', '3209',
    '3210', '3212', '3214', '3211', '3215', '3217', '3216', '3257', '3221', '3224',
    '3222', '3219', '3220', '3218', '3223', '3440', '3351', '3423', '3277', '3436',
    '3353', '3439', '3445', '3447', '3460', '3470', '3462', '3477', '3465', '3467',
    '3546', '3471', '3503', '3475'
  ];
  
  console.log('\n=== TFWS COLLEGES IN MUMBAI REGION ===');
  const tfwsInMumbai = Array.from(collegesWithTFWS).filter(college => {
    const collegeCode = college.split(' - ')[0];
    return mumbaiColleges.includes(collegeCode);
  });
  console.log(`TFWS colleges in Mumbai region: ${tfwsInMumbai.length}`);
  tfwsInMumbai.forEach(college => console.log(`  ${college}`));
  
  console.log('\n=== EWS COLLEGES IN MUMBAI REGION ===');
  const ewsInMumbai = Array.from(collegesWithEWS).filter(college => {
    const collegeCode = college.split(' - ')[0];
    return mumbaiColleges.includes(collegeCode);
  });
  console.log(`EWS colleges in Mumbai region: ${ewsInMumbai.length}`);
  ewsInMumbai.forEach(college => console.log(`  ${college}`));
  
} catch (error) {
  console.error('Error:', error.message);
} 