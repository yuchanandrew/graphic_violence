// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGHsok5iJvWldJe6Kl5Wr-aJcaHcIaF2k",
  authDomain: "graphic-violence.firebaseapp.com",
  projectId: "graphic-violence",
  storageBucket: "graphic-violence.firebasestorage.app",
  messagingSenderId: "713962556405",
  appId: "1:713962556405:web:4bb5b04996484ac4916ebc",
  measurementId: "G-ES4YVMY38Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(App);