# MHT CET Navigator Frontend

A modern, responsive web application for MHT CET and JEE college prediction, built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Multi-branch, priority-based college prediction form
- Toggle between CET and JEE prediction modes
- Region and district dropdowns populated from backend data
- User authentication (login/signup, JWT-based)
- Beautiful, responsive UI with dark mode support
- College insights, resources, and more

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README for setup)

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd "front end/mht-cet-navigator-main 2"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Usage

- **College Predictor:**
  - Select exam type (CET/JEE) using the toggle.
  - Fill in the required fields (percentile, region, etc.).
  - Add one or more branch groups in order of priority.
  - Click "Predict Colleges" to see your results.
- **Authentication:**
  - Sign up or log in to use the predictor.
  - After login, your name/email appears in the header with a dropdown for logout.
- **Dark Mode:**
  - Use the sun/moon icon in the header to toggle dark mode.

## Project Structure

```
src/
├── components/     # React UI components
│   └── ui/         # shadcn/ui components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components (routing)
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## API Integration
- The frontend expects the backend API to be running at `http://localhost:5001` by default.
- You can change the API base URL in the relevant files in `src/lib/` if needed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
