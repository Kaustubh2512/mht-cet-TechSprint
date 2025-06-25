# MHT CET Navigator

A comprehensive application to help students navigate through MHT CET admissions process.

## Features

### Frontend
- Modern React/TypeScript application
- Beautiful UI with shadcn/ui components
- Responsive design
- College predictor form
- Resources section
- Top colleges listing

### Backend
- Node.js/Express with TypeScript
- MongoDB database integration
- JWT-based authentication
- RESTful API endpoints
- User management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

### Backend
1. Navigate to the backend directory:
```bash
cd back end
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/mht-cet-navigator
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

### Frontend
1. Navigate to the frontend directory:
```bash
cd front end/mht-cet-navigator-main 2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected route)

## Project Structure

### Backend
```
src/
├── controllers/    # Route controllers
├── models/         # Database models
├── middleware/     # Custom middleware
├── routes/         # API routes
└── index.ts        # Application entry point
```

### Frontend
```
src/
├── components/     # React components
├── lib/           # Utility functions
├── styles/        # CSS styles
└── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
