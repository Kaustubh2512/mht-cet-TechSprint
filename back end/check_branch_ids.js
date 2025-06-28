const mongoose = require('mongoose');

// Define the Cutoff schema
const cutoffSchema = new mongoose.Schema({
  branch_id: String,
  college_code: String,
  college_name: String,
  branch_name: String,
  cutoffs: [{
    seat_type: String,
    category_code: String,
    percentile: Number,
    rank: Number
  }]
});

const Cutoff = mongoose.model('Cutoff', cutoffSchema);

async function checkBranchIds() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mht-cet-navigator');
    console.log('Connected to MongoDB');
    
    const branchIds = await Cutoff.distinct('branch_id');
    console.log('Available branch IDs for college 06991:');
    branchIds.filter(id => id.startsWith('06991')).forEach(id => console.log(id));
    
    console.log('\nAvailable branch IDs for college 6991:');
    branchIds.filter(id => id.startsWith('6991')).forEach(id => console.log(id));
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkBranchIds(); 