// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDADI48FL-9Jp03vll22KjAJ1rd-ezAXk0",
    authDomain: "dalang-lang.firebaseapp.com",
    projectId: "dalang-lang",
    storageBucket: "dalang-lang.appspot.com",
    messagingSenderId: "151890334408",
    appId: "1:151890334408:web:424ed3c0cd7f36223d4bfd",
    measurementId: "G-K5MGHB3YD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;