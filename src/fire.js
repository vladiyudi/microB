import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// import {getAuth,  createUserWithEmailAndPassword} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDXTk6CadA1vxhe3-cY8U6U2XwOJXYnw5c",
  authDomain: "twitter-app-e34e2.firebaseapp.com",
  projectId: "twitter-app-e34e2",
  storageBucket: "twitter-app-e34e2.appspot.com",
  messagingSenderId: "868377901483",
  appId: "1:868377901483:web:e801e9c40a475f1254faee",
  measurementId: "G-S8375C9WHG"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db = getFirestore(app);

