// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiJVM0jxgYgpQ020z-8OT4tvA5qEJNP8M",
  authDomain: "modalconfigiration.firebaseapp.com",
  projectId: "modalconfigiration",
  storageBucket: "modalconfigiration.appspot.com",
  messagingSenderId: "946668471994",
  appId: "1:946668471994:web:16bf767d273c92f97ee483",
  measurementId: "G-5HX8WN2XDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
