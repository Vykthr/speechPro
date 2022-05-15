// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPb7lXevo1kjd64abFrTVACgmjAfIOiWs",
  authDomain: "speechpro-58a0a.firebaseapp.com",
  projectId: "speechpro-58a0a",
  storageBucket: "speechpro-58a0a.appspot.com",
  messagingSenderId: "954493992924",
  appId: "1:954493992924:web:2fa06d20a59bc96d8b5919",
  measurementId: "G-766GTZECZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;