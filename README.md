# MHT CET Navigator

A full-stack web application to help students navigate the MHT CET and JEE admissions process, featuring robust college prediction, user authentication, and a modern, responsive UI.

## Features

- Multi-branch, priority-based college prediction (CET & JEE)
- Region, district, and branch group selection
- User authentication (JWT-based)
- Beautiful, responsive UI with dark mode
- College insights, resources, and more
- RESTful API with MongoDB backend

## Monorepo Structure

```
.
├── back end/         # Node.js/Express backend (TypeScript)
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── ...
├── front end/
│   └── mht-cet-navigator-main 2/   # React/Vite frontend
│       ├── src/
│       ├── package.json
│       ├── README.md
│       └── ...
├── README.md         # (this file)
└── ...
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/0xYuvi/mht-cet-navigator.git
cd mht-cet-navigator
```

### 2. Setup Backend
```bash
cd "back end"
npm install
# Create a .env file (see back end/README.md for details)
npm run dev
```

### 3. Setup Frontend
```bash
cd "front end/mht-cet-navigator-main 2"
npm install
npm run dev
```

- The backend runs on [http://localhost:5001](http://localhost:5001)
- The frontend runs on [http://localhost:5173](http://localhost:5173)

## Usage
- Open the frontend in your browser.
- Register or log in to use the college predictor.
- Select exam type, fill in your details, and get personalized college predictions.

## More Information
- **Backend details:** See [`back end/README.md`](back%20end/README.md)
- **Frontend details:** See [`front end/mht-cet-navigator-main 2/README.md`](front%20end/mht-cet-navigator-main%202/README.md)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 