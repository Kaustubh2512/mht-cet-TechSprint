import express from 'express';
import { predictColleges, PredictionInput } from '../services/prediction';
import { auth as authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/predict', authenticateToken, async (req, res) => {
  try {
    const input: PredictionInput = req.body;
    
    // Validate required fields
    if ((!input.branch_id && !input.standardized_branch_id) || input.percentile === undefined || !input.category) {
      return res.status(400).json({ 
        error: 'Missing required fields: branch_id or standardized_branch_id, percentile, and category are required' 
      });
    }

    // Validate numeric fields
    if (typeof input.percentile !== 'number' || isNaN(input.percentile)) {
      return res.status(400).json({ 
        error: 'percentile must be a number' 
      });
    }

    // Get predictions
    const predictions = await predictColleges(input);
    
    res.json({ predictions });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      error: 'Failed to generate predictions. Please try again later.' 
    });
  }
});

export default router; 