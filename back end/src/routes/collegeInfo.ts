import express from 'express';
import { getCollegesList, getCollegeAIInfo } from '../controllers/collegeInfoController';

const router = express.Router();

router.get('/list', getCollegesList);
router.post('/info', getCollegeAIInfo);

export default router; 