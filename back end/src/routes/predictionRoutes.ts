import express from 'express';
import { auth } from '../middlewares/auth';
import { predictColleges } from '../controllers/predictionController';

const router = express.Router();

// POST /api/predict - Get college predictions
router.post('/predict', auth, predictColleges);

export default router; 