const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');

// 1. Define your schema (should match your Mongoose model)
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

// 2. Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/mht-cet-navigator';

async function importCSV() {
  await mongoose.connect(MONGO_URI);

  // 3. Convert CSV to JSON
  const filePath = path.join(__dirname, '../final_cutoffs_with_branches.csv');
  const jsonArray = await csv().fromFile(filePath);

  // 4. Convert string booleans/numbers
  const parsedArray = jsonArray.map(row => ({
    ...row,
    percentile: parseFloat(row.percentile),
    is_tfws: row.is_tfws === 'True' || row.is_tfws === 'true',
    is_ews: row.is_ews === 'True' || row.is_ews === 'true',
  }));

  // Debug logs
  console.log('Parsed array length:', parsedArray.length);
  console.log('First record:', parsedArray[0]);

  // 5. Insert into MongoDB
  await Cutoff.deleteMany({}); // Optional: clear old data
  await Cutoff.insertMany(parsedArray);
  console.log('✅ Data imported!');
  process.exit();
}

importCSV(); 