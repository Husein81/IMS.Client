// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "imss-127c4.firebaseapp.com",
  projectId: "imss-127c4",
  storageBucket: "imss-127c4.appspot.com",
  messagingSenderId: "967292003367",
  appId: "1:967292003367:web:7d6283357e77aa01561a02",
  measurementId: "G-M6EHZ9SK1G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
