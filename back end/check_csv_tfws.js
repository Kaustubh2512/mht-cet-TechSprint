const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

async function checkCSV() {
  try {
    const filePath = path.join(__dirname, 'final_cutoffs_with_branches.csv');
    console.log('Checking file:', filePath);
    
    const jsonArray = await csv().fromFile(filePath);
    console.log('Total records in CSV:', jsonArray.length);
    
    // Check for TFWS and EWS
    const tfwsRecords = jsonArray.filter(row => 
      row.category_code && row.category_code.includes('TFWS')
    );
    const ewsRecords = jsonArray.filter(row => 
      row.category_code && row.category_code.includes('EWS')
    );
    
    console.log('\n=== RESULTS ===');
    console.log('TFWS records found:', tfwsRecords.length);
    console.log('EWS records found:', ewsRecords.length);
    
    if (tfwsRecords.length > 0) {
      console.log('\nFirst TFWS record:', tfwsRecords[0]);
    }
    
    if (ewsRecords.length > 0) {
      console.log('\nFirst EWS record:', ewsRecords[0]);
    }
    
    // Show unique category codes
    const uniqueCodes = [...new Set(jsonArray.map(row => row.category_code))];
    console.log('\nUnique category codes (first 20):', uniqueCodes.slice(0, 20));
    
    // Check if TFWS/EWS are in the unique codes
    const tfwsCodes = uniqueCodes.filter(code => code && code.includes('TFWS'));
    const ewsCodes = uniqueCodes.filter(code => code && code.includes('EWS'));
    
    console.log('\nTFWS codes in CSV:', tfwsCodes);
    console.log('EWS codes in CSV:', ewsCodes);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkCSV(); 