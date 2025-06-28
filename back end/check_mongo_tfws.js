const mongoose = require('mongoose');

// Define the schema (same as your backend)
const cutoffSchema = new mongoose.Schema({
  college_code: String,
  college_name: String,
  branch_id: String,
  branch_name: String,
  seat_type: String,
  category_code: String,
  percentile: Number,
  is_tfws: Boolean,
  is_ews: Boolean,
});
const Cutoff = mongoose.model('Cutoff', cutoffSchema);

async function checkMongoDB() {
  try {
    const MONGO_URI = 'mongodb://localhost:27017/mht-cet-navigator';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Check total records
    const totalRecords = await Cutoff.countDocuments();
    console.log('Total records in MongoDB:', totalRecords);

    // Check for TFWS and EWS records
    const tfwsRecords = await Cutoff.find({
      $or: [
        { category_code: { $regex: 'TFWS', $options: 'i' } },
        { is_tfws: true }
      ]
    }).limit(5);

    const ewsRecords = await Cutoff.find({
      $or: [
        { category_code: { $regex: 'EWS', $options: 'i' } },
        { is_ews: true }
      ]
    }).limit(5);

    console.log('\n=== TFWS RECORDS ===');
    console.log('TFWS records found:', tfwsRecords.length);
    if (tfwsRecords.length > 0) {
      console.log('First TFWS record:', tfwsRecords[0]);
    }

    console.log('\n=== EWS RECORDS ===');
    console.log('EWS records found:', ewsRecords.length);
    if (ewsRecords.length > 0) {
      console.log('First EWS record:', ewsRecords[0]);
    }

    // Check unique category codes
    const uniqueCodes = await Cutoff.distinct('category_code');
    console.log('\n=== UNIQUE CATEGORY CODES ===');
    console.log('Total unique codes:', uniqueCodes.length);
    console.log('First 20 codes:', uniqueCodes.slice(0, 20));

    // Check for TFWS/EWS in unique codes
    const tfwsCodes = uniqueCodes.filter(code => code && code.includes('TFWS'));
    const ewsCodes = uniqueCodes.filter(code => code && code.includes('EWS'));
    
    console.log('\nTFWS codes in MongoDB:', tfwsCodes);
    console.log('EWS codes in MongoDB:', ewsCodes);

    // Check specific college (06991)
    const college06991 = await Cutoff.find({ college_code: '06991' }).limit(3);
    console.log('\n=== COLLEGE 06991 RECORDS ===');
    console.log('Records found:', college06991.length);
    if (college06991.length > 0) {
      console.log('First record:', college06991[0]);
    }

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkMongoDB(); 