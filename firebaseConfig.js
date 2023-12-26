// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpSOzi9HxtEPfVrI3ZIunfL9ict2-Z7Pw",
  authDomain: "c-ev-charging-8a34c.firebaseapp.com",
  projectId: "c-ev-charging-8a34c",
  storageBucket: "c-ev-charging-8a34c.appspot.com",
  messagingSenderId: "582129181820",
  appId: "1:582129181820:web:7ab68a2b3314567488d5f9",
  measurementId: "G-0QQN6SGEDR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);