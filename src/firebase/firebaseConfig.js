// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAgQxXD4Wgxji_-PcQqubKzWBL1QPE1f8",
  authDomain: "test-proj-3b2b9.firebaseapp.com",
  projectId: "test-proj-3b2b9",
  storageBucket: "test-proj-3b2b9.firebasestorage.app",
  messagingSenderId: "592808834924",
  appId: "1:592808834924:web:e3430a101da236a02ce549",
  measurementId: "G-YVE3VXYNS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);