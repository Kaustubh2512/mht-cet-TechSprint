import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Authorization header:', req.header('Authorization'));
    
    if (!token) {
      console.log('No token found');
      throw new Error();
    }

    // Use the same default as in users.ts
    console.log('JWT_SECRET in middleware:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Decoded token:', decoded);
    // Use _id from the token payload
    const user = await User.findOne({ _id: (decoded as any)._id });
    console.log('User found:', user);

    if (!user) {
      console.log('No user found for token');
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Auth error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await auth(req, res, () => {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
}; 