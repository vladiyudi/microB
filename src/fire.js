import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// import {getAuth,  createUserWithEmailAndPassword} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyDXTk6CadA1vxhe3-cY8U6U2XwOJXYnw5c",
//   authDomain: "twitter-app-e34e2.firebaseapp.com",
//   projectId: "twitter-app-e34e2",
//   storageBucket: "twitter-app-e34e2.appspot.com",
//   messagingSenderId: "868377901483",
//   appId: "1:868377901483:web:e801e9c40a475f1254faee",
//   measurementId: "G-S8375C9WHG"
// };


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDuTbJ2udn0zdalHKDEfxj1Lc9lAJJXch0",
  authDomain: "microblogging-e4207.firebaseapp.com",
  projectId: "microblogging-e4207",
  storageBucket: "microblogging-e4207.appspot.com",
  messagingSenderId: "377810933185",
  appId: "1:377810933185:web:a517333adfaf4cacac4b40",
  measurementId: "G-N11DTL0X0F"

};


// Initialize Firebase



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db = getFirestore(app);

