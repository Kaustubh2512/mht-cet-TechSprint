const fs = require('fs');
const path = require('path');

// Load the JSON file
const jsonPath = path.join(__dirname, 'branchwise_cutoffsR1_debug.json');
console.log('Loading file:', jsonPath);

try {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log('File loaded successfully.');
  console.log('Data type:', typeof data);
  console.log('Is array:', Array.isArray(data));
  console.log('Keys (if object):', data ? Object.keys(data).slice(0, 10) : 'null');
  
  if (Array.isArray(data)) {
    console.log('Array length:', data.length);
    if (data.length > 0) {
      console.log('First entry keys:', Object.keys(data[0]));
      console.log('First entry sample:', JSON.stringify(data[0], null, 2).substring(0, 500));
    }
  } else if (typeof data === 'object') {
    console.log('Object keys count:', Object.keys(data).length);
    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      console.log('First key:', firstKey);
      console.log('First value type:', typeof data[firstKey]);
      console.log('First value sample:', JSON.stringify(data[firstKey], null, 2).substring(0, 500));
    }
  }

  // Set to store unique category codes
  const tfwsCodes = new Set();
  const ewsCodes = new Set();
  const allCodes = new Set();

  // Function to search in an entry
  function searchInEntry(entry) {
    if (entry.cutoffs && Array.isArray(entry.cutoffs)) {
      entry.cutoffs.forEach(cutoff => {
        if (cutoff.category_code) {
          allCodes.add(cutoff.category_code);
          
          if (cutoff.category_code.includes('TFWS')) {
            tfwsCodes.add(cutoff.category_code);
          }
          
          if (cutoff.category_code.includes('EWS')) {
            ewsCodes.add(cutoff.category_code);
          }
        }
      });
    }
  }

  // Search based on data structure
  if (Array.isArray(data)) {
    data.forEach(searchInEntry);
  } else if (typeof data === 'object') {
    Object.values(data).forEach(value => {
      if (Array.isArray(value)) {
        value.forEach(searchInEntry);
      } else if (typeof value === 'object') {
        searchInEntry(value);
      }
    });
  }

  console.log('\n=== RESULTS ===');
  console.log('Total unique category codes found:', allCodes.size);
  console.log('TFWS codes found:', tfwsCodes.size);
  console.log('EWS codes found:', ewsCodes.size);
  
  if (tfwsCodes.size > 0) {
    console.log('\nTFWS codes:', Array.from(tfwsCodes));
  } else {
    console.log('\n❌ No TFWS codes found in the data');
  }
  
  if (ewsCodes.size > 0) {
    console.log('\nEWS codes:', Array.from(ewsCodes));
  } else {
    console.log('\n❌ No EWS codes found in the data');
  }

  // Show first few unique codes for reference
  console.log('\nFirst 20 unique category codes:', Array.from(allCodes).slice(0, 20));

} catch (error) {
  console.error('Error reading file:', error.message);
} 