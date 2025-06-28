const mongoose = require('mongoose');

const cutoffSchema = new mongoose.Schema({
  branch_id: String,
  college_code: String,
  college_name: String,
  branch_name: String,
  cutoffs: Array
});

const Cutoff = mongoose.model('Cutoff', cutoffSchema);

async function testMumbaiColleges() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mht-cet-navigator');
    console.log('Connected to MongoDB');
    
    // Check some Mumbai colleges
    const mumbaiColleges = ['03014', '03025', '03036', '03012', '03035'];
    console.log('Checking Mumbai colleges in MongoDB:');
    
    for (const code of mumbaiColleges) {
      const docs = await Cutoff.find({college_code: code});
      console.log(`${code}: ${docs.length} branches`);
      if (docs.length > 0) {
        console.log(`  Sample: ${docs[0].college_name} - ${docs[0].branch_name}`);
      }
    }
    
    // Check for Information Technology branches in Mumbai
    console.log('\nChecking for Information Technology branches in Mumbai:');
    const itBranches = await Cutoff.find({
      college_code: { $in: ['03014', '03025', '03036', '03012', '03035'] },
      branch_name: { $regex: /Information Technology/i }
    });
    console.log(`Found ${itBranches.length} IT branches in Mumbai colleges`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testMumbaiColleges(); 