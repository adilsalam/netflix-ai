// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflixai-b1a58.firebaseapp.com",
  projectId: "netflixai-b1a58",
  storageBucket: "netflixai-b1a58.firebasestorage.app",
  messagingSenderId: "1002751680066",
  appId: "1:1002751680066:web:05f69b0974b3274d1a57db",
  measurementId: "G-8R6WBC8E0S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();
