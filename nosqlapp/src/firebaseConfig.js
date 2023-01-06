// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqgK1G0NN-5gqhJ2m0M6a5wMU37lhwFCc",
  authDomain: "webapp-nosql-67057.firebaseapp.com",
  projectId: "webapp-nosql-67057",
  storageBucket: "webapp-nosql-67057.appspot.com",
  messagingSenderId: "519493576",
  appId: "1:519493576:web:e1527be11331272ccf92fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
