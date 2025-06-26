import express from 'express';
import { auth } from '../middlewares/auth';
import { predictColleges, predictCollegesJEE } from '../controllers/predictionController';

const router = express.Router();

// POST /api/predict - Get college predictions
router.post('/predict', predictColleges);

// POST /api/predict-jee - Get JEE college predictions
router.post('/predict-jee', predictCollegesJEE);

export default router; 