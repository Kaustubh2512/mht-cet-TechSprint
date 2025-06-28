import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import predictionRoutes from './routes/predictionRoutes';
import branchesRoutes from './routes/branches';
import collegeInfoRoutes from './routes/collegeInfo';
import { loadBranchMapping } from './utils/branchMapping';

// Load environment variables
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug: print JWT secret
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'http://localhost:4173',
    'https://mht-cet-navigator.onrender.com',
    'https://aicollegebuddy.vercel.app',
    'https://mht-cet-navigator.vercel.app',
    'https://mht-cet-navigator-git-main.vercel.app',
    'https://mht-cet-navigator-git-develop.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mht-cet-navigator')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Load branch mapping before starting the server
loadBranchMapping().then(() => {
  // Routes
  app.use('/api/users', userRoutes);
  app.use('/api/prediction', predictionRoutes);
  app.use('/api/branches', branchesRoutes);
  app.use('/api/colleges', collegeInfoRoutes);

  // Basic route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MHT CET Navigator API' });
  });

  // Error handling middleware
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // Start server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 