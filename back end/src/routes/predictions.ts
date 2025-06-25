import express from 'express';
import { auth } from '../middleware/auth';
import { predictColleges } from '../services/prediction';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const prediction = await predictColleges(req.body);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: 'Error making prediction' });
  }
});

export default router; 