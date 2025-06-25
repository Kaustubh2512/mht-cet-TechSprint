import { Request, Response } from 'express';
import { predictColleges as predictCollegesService } from '../services/prediction';

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { branch_id, standardized_branch_id, percentile, category, gender } = req.body;

    // Validate required fields
    if ((!branch_id && !standardized_branch_id) || percentile === undefined || !category || !gender) {
      return res.status(400).json({
        success: false,
        message: 'branch_id or standardized_branch_id, percentile, category, and gender are required'
      });
    }

    // Call the prediction service
    const predictions = await predictCollegesService({
      branch_id,
      standardized_branch_id,
      percentile,
      category,
      gender
    });

    return res.status(200).json({
      success: true,
      data: predictions
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating predictions'
    });
  }
}; 