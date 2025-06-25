import express from 'express';
import { getAllStandardizedBranchIds } from '../utils/branchMapping';

const router = express.Router();

// GET /api/branches/standardized - List all standardized branch IDs
router.get('/standardized', (req, res) => {
  const ids = getAllStandardizedBranchIds();
  res.json({ standardized_branch_ids: ids });
});

export default router; 