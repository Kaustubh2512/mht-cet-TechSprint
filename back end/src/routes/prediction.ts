import express from 'express';
import { predictColleges, PredictionInput } from '../services/prediction';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/predict', authenticateToken, async (req, res) => {
  try {
    const input: PredictionInput = req.body;
    
    // Validate required fields
    if (!input.jeeMainRank || !input.mhtCETScore || !input.category || !input.preferredBranch) {
      return res.status(400).json({ 
        error: 'Missing required fields: jeeMainRank, mhtCETScore, category, and preferredBranch are required' 
      });
    }

    // Validate numeric fields
    if (isNaN(input.jeeMainRank) || isNaN(input.mhtCETScore)) {
      return res.status(400).json({ 
        error: 'jeeMainRank and mhtCETScore must be numbers' 
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