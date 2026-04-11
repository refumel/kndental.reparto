// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkOFysyl_mOZo8JQJGzLlJys4dfk175E",
  authDomain: "kndentalreparto.firebaseapp.com",
  projectId: "kndentalreparto",
  storageBucket: "kndentalreparto.firebasestorage.app",
  messagingSenderId: "27069906559",
  appId: "1:27069906559:web:c643980d7011040a96094a",
  measurementId: "G-9Z9FVZ262S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
