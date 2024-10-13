
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcBhWqWuSrpskD1wiCcDBzXs0zEifDJQE",
  authDomain: "bubbles-a264b.firebaseapp.com",
  projectId: "bubbles-a264b",
  storageBucket: "bubbles-a264b.appspot.com",
  messagingSenderId: "529814841432",
  appId: "1:529814841432:web:5b1e5078f644be7451422d",
  measurementId: "G-RHXSDGHS8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
