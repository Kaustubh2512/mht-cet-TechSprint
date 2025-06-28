const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load region data
const regionPath = path.join(__dirname, 'grouped_by_region.json');
const regionData = JSON.parse(fs.readFileSync(regionPath, 'utf-8'));

// Load district to university mapping
const districtToUniPath = path.join(__dirname, 'district_to_uni.json');
const districtToUni = JSON.parse(fs.readFileSync(districtToUniPath, 'utf-8'));

// Define the Cutoff schema
const cutoffSchema = new mongoose.Schema({
  college_code: String,
  college_name: String,
  branch_id: String,
  branch_name: String,
  cutoffs: Array
});

const Cutoff = mongoose.model('Cutoff', cutoffSchema);

async function debugOBCFlow() {
  console.log('=== DEBUGGING OBC CATEGORY FLOW ===\n');
  
  // Example parameters (you can change these)
  const params = {
    branch_ids: ['1234567890'], // Example branch_id
    percentile: 85.5,
    category: 'OBC',
    gender: 'Male',
    region: 'Pune',
    district: 'Pune'
  };
  
  console.log('1. INPUT PARAMETERS:');
  console.log(JSON.stringify(params, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 1: Get region colleges
  console.log('2. GETTING REGION COLLEGES:');
  const regionCollegesRaw = regionData[params.region] || {};
  const regionColleges = {};
  for (const code of Object.keys(regionCollegesRaw)) {
    regionColleges[code.padStart(5, '0')] = regionCollegesRaw[code];
  }
  const regionCollegeCodes = Object.keys(regionColleges);
  console.log(`Region: ${params.region}`);
  console.log(`Total colleges in region: ${regionCollegeCodes.length}`);
  console.log(`First 5 college codes: ${regionCollegeCodes.slice(0, 5).join(', ')}`);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 2: Get user's home universities
  console.log('3. GETTING USER HOME UNIVERSITIES:');
  const userHomeUnis = districtToUni[params.district] || [];
  console.log(`District: ${params.district}`);
  console.log(`Home universities: ${userHomeUnis.join(', ')}`);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 3: Query MongoDB
  console.log('4. QUERYING MONGODB:');
  console.log(`Query: branch_id in [${params.branch_ids.join(', ')}] AND college_code in [${regionCollegeCodes.length} colleges]`);
  
  const docs = await Cutoff.find({
    branch_id: { $in: params.branch_ids },
    college_code: { $in: regionCollegeCodes }
  }).lean();
  
  console.log(`Total documents found: ${docs.length}`);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 4: Process each document
  console.log('5. PROCESSING EACH DOCUMENT:');
  let allCutoffs = [];
  let processedDocs = 0;
  let skippedDocs = 0;
  
  for (const doc of docs) {
    processedDocs++;
    console.log(`\n--- Document ${processedDocs} ---`);
    console.log(`College: ${doc.college_name} (${doc.college_code})`);
    console.log(`Branch: ${doc.branch_name} (${doc.branch_id})`);
    
    if (!doc.college_code || !doc.college_name || !doc.branch_name || !Array.isArray(doc.cutoffs)) {
      console.log('❌ SKIPPED: Missing required fields or cutoffs not array');
      skippedDocs++;
      continue;
    }
    
    const collegeInfo = regionColleges[doc.college_code] || {};
    const isAutonomous = collegeInfo.is_autonomous || false;
    const collegeHomeUni = collegeInfo.home_university || '';
    
    console.log(`Is Autonomous: ${isAutonomous}`);
    console.log(`Home University: ${collegeHomeUni}`);
    console.log(`Total cutoffs in document: ${doc.cutoffs.length}`);
    
    let validCutoffs = 0;
    
    // Process each cutoff
    for (const cutoff of doc.cutoffs) {
      if (!cutoff || typeof cutoff !== 'object') {
        console.log('  ❌ SKIPPED: Invalid cutoff object');
        continue;
      }
      
      const code = cutoff.category_code;
      const seatType = cutoff.seat_type;
      
      if (typeof code !== 'string' || typeof seatType !== 'string') {
        console.log('  ❌ SKIPPED: Invalid category_code or seat_type');
        continue;
      }
      
      console.log(`\n  Analyzing cutoff: ${code} (${seatType})`);
      
      // Gender filtering
      const startChar = code[0];
      console.log(`  Gender check: code starts with '${startChar}', user gender: ${params.gender}`);
      
      if (code !== 'TFWS' && code !== 'EWS') {
        if (params.gender === 'Male' && startChar !== 'G') {
          console.log('  ❌ SKIPPED: Male user but code doesn\'t start with G');
          continue;
        }
        if (params.gender === 'Female' && !(startChar === 'G' || startChar === 'L')) {
          console.log('  ❌ SKIPPED: Female user but code doesn\'t start with G or L');
          continue;
        }
      } else {
        console.log('  ✅ Gender check: TFWS/EWS - skipping gender filtering');
      }
      
      // Category filtering
      console.log(`  Category check: looking for '${params.category}' in '${code}'`);
      
      if (params.category === 'EWS' || params.category === 'TFWS') {
        if (!code.toUpperCase().includes(params.category.toUpperCase())) {
          console.log('  ❌ SKIPPED: EWS/TFWS category not found in code');
          continue;
        }
      } else if (params.category === 'OPEN' || params.category === 'General') {
        if (!code.includes('OPEN')) {
          console.log('  ❌ SKIPPED: OPEN category not found in code');
          continue;
        }
      } else {
        // This is where OBC filtering happens
        if (!(code.includes(params.category) || code.includes('OPEN'))) {
          console.log(`  ❌ SKIPPED: '${params.category}' not found in code and not OPEN`);
          continue;
        }
      }
      
      console.log('  ✅ Category check: PASSED');
      
      // Seat type filtering
      const seatCode = code.slice(-1);
      console.log(`  Seat type check: last character is '${seatCode}'`);
      
      if (isAutonomous && seatCode !== 'S') {
        console.log('  ❌ SKIPPED: Autonomous college but not S seat');
        continue;
      }
      if (!isAutonomous) {
        if (userHomeUnis.includes(collegeHomeUni)) {
          if (seatCode !== 'H') {
            console.log('  ❌ SKIPPED: Home university student but not H seat');
            continue;
          }
        } else {
          if (seatCode !== 'O') {
            console.log('  ❌ SKIPPED: Other university student but not O seat');
            continue;
          }
        }
      }
      
      console.log('  ✅ Seat type check: PASSED');
      
      // Percentile filtering
      console.log(`  Percentile check: cutoff ${cutoff.percentile} vs user ${params.percentile}`);
      if (typeof cutoff.percentile !== 'number' || cutoff.percentile > params.percentile) {
        console.log('  ❌ SKIPPED: Percentile too high or invalid');
        continue;
      }
      
      console.log('  ✅ Percentile check: PASSED');
      console.log('  ✅ ALL CHECKS PASSED - Adding to results');
      
      validCutoffs++;
      allCutoffs.push({
        collegeName: doc.college_name,
        branch: doc.branch_name,
        branchGroup: doc.branch_id, // Simplified for demo
        location: '',
        collegeType: seatType,
        probability: 1,
        cutoff: cutoff.percentile,
        category: code,
        seatType: seatType,
        rank: cutoff.rank ?? 0
      });
    }
    
    console.log(`  Total valid cutoffs for this document: ${validCutoffs}`);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  console.log('6. FINAL RESULTS:');
  console.log(`Total documents processed: ${processedDocs}`);
  console.log(`Total documents skipped: ${skippedDocs}`);
  console.log(`Total valid cutoffs found: ${allCutoffs.length}`);
  
  if (allCutoffs.length > 0) {
    console.log('\nSample results:');
    allCutoffs.slice(0, 5).forEach((cutoff, index) => {
      console.log(`${index + 1}. ${cutoff.collegeName} - ${cutoff.branch} (${cutoff.category}) - ${cutoff.cutoff}%`);
    });
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  console.log('7. OBC CATEGORY SPECIFIC NOTES:');
  console.log('- OBC category codes typically contain "OBC" in the category_code');
  console.log('- Examples: "GOBCH", "GOBCO", "GOBCS"');
  console.log('- The code structure is: [Gender][Category][SeatType]');
  console.log('- For OBC: G = General (both genders), OBC = category, H/O/S = seat type');
  console.log('- The filtering logic checks: code.includes("OBC") || code.includes("OPEN")');
  console.log('- This means OBC students can also see OPEN category seats as fallback');
}

// Connect to MongoDB and run the debug
mongoose.connect('mongodb://localhost:27017/mhtcet')
  .then(() => {
    console.log('Connected to MongoDB');
    return debugOBCFlow();
  })
  .then(() => {
    console.log('\nDebug completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  }); 