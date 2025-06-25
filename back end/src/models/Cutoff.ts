import mongoose from 'mongoose';

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

export default mongoose.model('Cutoff', cutoffSchema); 