// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
import{getDatabase} from 'firebase/database'
// import firebase from "firebase/app";
// import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3ziwY_nFqLRwNoAaHkXA-JdPDWNOoES4",
  authDomain: "jahott-7a7ed.firebaseapp.com",
  databaseURL:
    "https://jahott-7a7ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jahott-7a7ed",
  storageBucket: "jahott-7a7ed.appspot.com",
  messagingSenderId: "433777298897",
  appId: "1:433777298897:web:9c72c02ca7552d0856e4f0",
  measurementId: "G-H1HGKWHCKQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp)
export { storage,database,firebaseApp as default };
