# Google Hackathon Submission: MHT-CET Navigator AI

This project has been supercharged with Google Technologies to provide an intelligent, personalized, and seamless experience for students seeking engineering admission in Maharashtra.

## 🚀 Google Technologies Used

### 1. **Gemini API (via Vertex AI / AI Studio)**
*   **Feature**: **AI Admission Counselor**
*   **Implementation**: We integrated the `gemini-1.5-flash` model to create a conversational AI that answers student queries about cutoffs, college comparisons, and admission processes.
*   **Code**: `back end/src/services/aiService.ts`, `front end/.../src/pages/AICounselor.tsx`

### 2. **Firebase Authentication**
*   **Feature**: **One-Click Google Sign-In**
*   **Implementation**: Replaced standard auth with **Firebase Authentication (Google Provider)** for secure, friction-less onboarding.
*   **Code**: `front end/.../src/lib/firebase.ts`, `front end/.../src/components/Header.tsx`

### 3. **Google Maps Platform**
*   **Feature**: **Interactive College Locator**
*   **Implementation**: Used the **Maps JavaScript API** to visualize college locations, helping students understand distance and connectivity.
*   **Code**: `front end/.../src/components/CollegeMap.tsx`

### 4. **Google reCAPTCHA v2**
*   **Feature**: **Bot Protection**
*   **Implementation**: Secured the core "College Predictor" tool using reCAPTCHA to prevent abuse and ensure fair access.
*   **Code**: `front end/.../src/components/PredictorForm.tsx`

### 5. **Web Speech API (Google Chrome)**
*   **Feature**: **Voice-Activated Interaction**
*   **Implementation**: Used the browser's native Speech Recognition and Synthesis (powered by Google generally in Chrome) to allow students to **talk** to the AI Counselor.
*   **Code**: `front end/.../src/pages/AICounselor.tsx`

## 🛠️ Setup Instructions

### Backend
1.  Navigate to `back end/`
2.  Create `.env`:
    ```env
    GEMINI_API_KEY=your_gemini_key
    JWT_SECRET=your_secret
    MONGODB_URI=your_mongo_uri
    ```
3.  `npm install && npm run dev`

### Frontend
1.  Navigate to `front end/mht-cet-navigator-main 2/`
2.  Create `.env`:
    ```env
    VITE_FIREBASE_API_KEY=...
    VITE_GOOGLE_MAPS_API_KEY=...
    VITE_RECAPTCHA_SITE_KEY=...
    VITE_API_BASE_URL=http://localhost:5001
    ```
3.  `npm install && npm run dev`

## 🎥 Key Differentiator
Unlike static lists, our app **understands** the student (Gemini), **listens** to them (Voice), **remembers** them (Firebase), and **guides** them visually (Maps).
