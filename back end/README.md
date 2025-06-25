# MHT CET Navigator Backend

This is the backend service for the MHT CET Navigator project. It provides RESTful APIs for college prediction, user authentication, and data management, using Node.js, Express, TypeScript, and MongoDB.

For a full project overview and frontend setup, see the [top-level README](../README.md).

## Features
- College prediction for MHT CET and JEE (multi-branch, priority-based)
- Region, district, and branch group filtering
- User authentication (JWT-based)
- MongoDB integration
- Robust data file support (CSV/JSON)
- RESTful API endpoints

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Required data files (see below)

## Setup

1. Navigate to the backend directory:
   ```bash
   cd "back end"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/mht-cet-navigator
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

4. Ensure the following data files are present in the `back end/` directory:
   - `branches.csv`
   - `standardized_branch_ids.csv`
   - `district_to_uni.json`
   - `jee_main_merit_list.json`
   - `mongo_cutoffs.json` (or your main cutoffs data file)

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The backend will run on [http://localhost:5001](http://localhost:5001) by default.

## API Endpoints

### Authentication
- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login user
- `GET /api/users/profile` — Get user profile (protected)

### Prediction
- `POST /api/prediction/predict` — Predict colleges (CET)
- `POST /api/prediction/predict-jee` — Predict colleges (JEE)

### Branches
- `GET /api/branches/standardized` — Get all standardized branch groups

## Project Structure
```
src/
├── controllers/    # Route controllers
├── models/         # Database models
├── middleware/     # Custom middleware
├── routes/         # API routes
├── services/       # Business logic, data loading
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## Data Files
- Place all required CSV/JSON data files in the `back end/` directory.
- Update file paths in the code if you move data files.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
 