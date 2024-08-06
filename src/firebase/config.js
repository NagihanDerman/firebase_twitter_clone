// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfW-YaRLis4ijjaX3junYBSWw8VeXQK00",
  authDomain: "nour-twitter-clone.firebaseapp.com",
  projectId: "nour-twitter-clone",
  storageBucket: "nour-twitter-clone.appspot.com",
  messagingSenderId: "40911358303",
  appId: "1:40911358303:web:df8774a2ccddbb8e548eea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth hizmetinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritbanının referansını al
export const db = getFirestore(app);

// storage referansını al
export const storage = getStorage(app);
