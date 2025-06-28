console.log('=== TESTING TFWS CATEGORY SELECTION ===\n');

// Test parameters
const testParams = {
  category: 'TFWS',  // Changed from OBC to TFWS
  gender: 'Male',
  percentile: 85.5
};

const exampleCategoryCodes = [
  'GOPENH', 'GOPENO', 'GOBCH', 'GOBCO', 'GSCSH', 'GSTSH', 
  'LOPENH', 'LOBCH', 'TFWS', 'EWS'
];

console.log('1. USER SELECTS TFWS CATEGORY');
console.log(`Category: ${testParams.category}`);
console.log(`Gender: ${testParams.gender}`);
console.log('\n' + '='.repeat(60) + '\n');

console.log('2. FILTERING RESULTS FOR TFWS CATEGORY:\n');

exampleCategoryCodes.forEach((code, index) => {
  console.log(`--- Code ${index + 1}: ${code} ---`);
  
  // Gender filtering
  const startChar = code[0];
  let genderPassed = false;
  
  if (code === 'TFWS' || code === 'EWS') {
    console.log('   ✅ Gender: TFWS/EWS - skipping gender filtering');
    genderPassed = true;
  } else if (testParams.gender === 'Male') {
    if (startChar === 'G') {
      console.log('   ✅ Gender: Male user, code starts with G - PASSED');
      genderPassed = true;
    } else {
      console.log('   ❌ Gender: Male user, code doesn\'t start with G - FAILED');
    }
  }
  
  if (!genderPassed) {
    console.log('   ❌ OVERALL: Failed gender check - SKIPPED');
    console.log('');
    return;
  }
  
  // Category filtering
  console.log(`   Category Check: Looking for '${testParams.category}' in '${code}'`);
  
  let categoryPassed = false;
  if (testParams.category === 'EWS' || testParams.category === 'TFWS') {
    if (code.toUpperCase().includes(testParams.category.toUpperCase())) {
      console.log(`   ✅ Category: ${testParams.category} found in code - PASSED`);
      categoryPassed = true;
    } else {
      console.log(`   ❌ Category: ${testParams.category} not found in code - FAILED`);
    }
  }
  
  if (!categoryPassed) {
    console.log('   ❌ OVERALL: Failed category check - SKIPPED');
    console.log('');
    return;
  }
  
  console.log('   ✅ OVERALL: ALL CHECKS PASSED - INCLUDED IN RESULTS');
  console.log('');
});

console.log('='.repeat(60) + '\n');
console.log('3. SUMMARY FOR TFWS CATEGORY:');
console.log('');
console.log('✅ CODES THAT WOULD PASS (for Male user):');
console.log('   - TFWS (Tuition Fee Waiver Scheme)');
console.log('');
console.log('❌ CODES THAT WOULD FAIL:');
console.log('   - All other codes (GOPENH, GOBCH, EWS, etc.)');
console.log('');
console.log('4. CONCLUSION:');
console.log('   - When you select TFWS category, ONLY TFWS codes pass');
console.log('   - When you select OBC category, TFWS codes are intentionally excluded');
console.log('   - This is the correct behavior - categories are mutually exclusive'); 