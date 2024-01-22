// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMPrhCcijXGdUFaBM3R8ThCp4DgW8Jjdg",
  authDomain: "tourapp-dddd5.firebaseapp.com",
  projectId: "tourapp-dddd5",
  storageBucket: "tourapp-dddd5.appspot.com",
  messagingSenderId: "992825310539",
  appId: "1:992825310539:web:04ba824c2b714ddd52fcce",
  measurementId: "G-8BSXFN71TN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);