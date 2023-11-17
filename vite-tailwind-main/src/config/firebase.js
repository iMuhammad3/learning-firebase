// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcaEJYguvIwjsJYkC2q8TeqgQKEI0OGgM",
  authDomain: "fir-course-c51ef.firebaseapp.com",
  projectId: "fir-course-c51ef",
  storageBucket: "fir-course-c51ef.appspot.com",
  messagingSenderId: "952435533546",
  appId: "1:952435533546:web:ccf89f6f6e178617925993",
  measurementId: "G-JG8L1RG94L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)