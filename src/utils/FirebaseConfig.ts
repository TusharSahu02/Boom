// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection,getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmywwxBH5EGl7-UGcjeriFoYKiyx_9oRQ",
  authDomain: "zoom-clone-3d528.firebaseapp.com",
  projectId: "zoom-clone-3d528",
  storageBucket: "zoom-clone-3d528.appspot.com",
  messagingSenderId: "955386138218",
  appId: "1:955386138218:web:b99f383b793cb0a3d28413",
  measurementId: "G-3GF8T8VJEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app)
export const userRef = collection(firebaseDB,"users")
export const meetingsRef = collection(firebaseDB,"meetings")