// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANUl9x8N2ZeA-RqkBGFQJ0nEUWsclrbkM",
  authDomain: "react-cursos-8633f.firebaseapp.com",
  projectId: "react-cursos-8633f",
  storageBucket: "react-cursos-8633f.appspot.com",
  messagingSenderId: "572593102739",
  appId: "1:572593102739:web:ca4523794cb73a02715266"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);