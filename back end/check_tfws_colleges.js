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
  
  // Check which of these colleges are in the Pune region mapping
  const puneColleges = [
    "6122","6138","6005","6004","6139","6036","6007","6028","6141","6144","6145","6149","6178","6175","6146","6156","6155","6177","6179","6182","6183","6184","6185","6187","6203","6206","6214","6207","6220","6217","6219","6222","6271","6223","6250","6265","6270","6272","6267","6268","6269","6273","6284","6278","6276","6275","6277","6274","6285","6283","6282","6281","6288","6293","6298","6303","6307","6310","6311","6308","6305","6304","6318","6313","6321","6315","6320","6324","6317","6322","6319","6325","6326","6444","6466","6402","6632","6622","6468","6609","6545","6628","6634","6643","6640","6635","6756","6755","6649","6714","6644","6732","6754","6759","6757","6758","6768","6766","6762","6767","6770","6769","6771","6772","6781","6780","6794","6795","6782","6796","6803","6799","6797","6808","6815","6811","6822","6839","6834","6878","16121","6901","6991","6938","16006","16126"
  ];

  console.log('\n=== TFWS COLLEGES IN PUNE REGION ===');
  const tfwsInPune = Array.from(collegesWithTFWS).filter(college => {
    const collegeCode = college.split(' - ')[0];
    return puneColleges.includes(collegeCode);
  });
  console.log(`TFWS colleges in Pune region: ${tfwsInPune.length}`);
  tfwsInPune.forEach(college => console.log(`  ${college}`));

  console.log('\n=== EWS COLLEGES IN PUNE REGION ===');
  const ewsInPune = Array.from(collegesWithEWS).filter(college => {
    const collegeCode = college.split(' - ')[0];
    return puneColleges.includes(collegeCode);
  });
  console.log(`EWS colleges in Pune region: ${ewsInPune.length}`);
  ewsInPune.forEach(college => console.log(`  ${college}`));
} catch (error) {
  console.error('Error:', error.message);
} 