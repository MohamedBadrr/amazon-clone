// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB1_0mMHMDgNwadrK-C0EkHU33i04d6RtE",
  authDomain: "clone-fd450.firebaseapp.com",
  projectId: "clone-fd450",
  storageBucket: "clone-fd450.firebasestorage.app",
  messagingSenderId: "891744622536",
  appId: "1:891744622536:web:a8bd0f7bc182c72b4e52fd",
  measurementId: "G-M9GL7XCSY2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
