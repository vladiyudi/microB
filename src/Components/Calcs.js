
import Navbar from "./Navbar";
import Home from "../Routes/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Routes/Profile";
import { useState, useEffect } from "react";
import { storage } from "../fire";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, addDoc, doc, snapshot, onSnapshot } from "firebase/firestore";
import { db } from "../fire.js";

export default function Calcs() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(
    null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();


  const userRef = collection(db, "Users")

  const updateUsersCollection = async (user)=>{
    const updatedUser = await addDoc(userRef, user);
    console.log(updatedUser)
  }
 

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        setImageUrl(user.photoURL)
      }
    });
  }, [auth]);

  const handleImageSubmit = async (profileImage) => {
    try {
    const imageRef = ref(storage, auth.currentUser.displayName.toString());
      setLoading(true);
      const snapshot = await uploadBytes(imageRef, profileImage) 
      const photoUrl = await getDownloadURL(imageRef)
      const udate = await updateProfile(auth.currentUser, {photoURL: photoUrl})
      setImageUrl( auth.currentUser.photoURL);
      setLoading(false);
    } catch (err) {
      console.error(err.message, "error in downloading img");
      setImageUrl(null);
    }
  };

  
 
  const authUser = async (input, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      const update = await updateProfile(auth.currentUser, {
        displayName: input,
      })
      setUserName(cred.user.displayName);
      setUserEmail(cred.user.email);

      updateUsersCollection({uid: cred.user.uid, displayName: cred.user.displayName, email: cred.user.email})

    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleLogout = async () => {
    try {
      const out = await signOut(auth);
      setUserEmail("");
      setUserName("");
      setImageUrl(null)
    } catch (err) {
      console.error("problem with logout: ", err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleProfile = (input, email, password) => {
    setUserName(input);
    setUserEmail(email);
    authUser(input, email, password);
  };

  const logInUser = async (input, email, password) => {
    try {
      const logedIn = await signInWithEmailAndPassword(auth, email, password);
      setUserName(input);
      setUserEmail(email);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUserEmail(result.user.email);
      setUserName(result.user.displayName);
      setImageUrl(result.user.photoURL)

      updateUsersCollection({uid: result.user.uid, displayName: result.user.displayName, email: result.user.email})

    } catch (err) {
      console.error(err);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home user={userName} userRef={userRef}/>} />
          <Route
            path="/"
            element={
              <Profile
                handleProfile={handleProfile}
                userName={userName}
                handleLogout={handleLogout}
                logInUser={logInUser}
                userEmail={userEmail}
                error={error}
                handleGoogle={handleGoogle}
                handleImageSubmit={handleImageSubmit}
                imageUrl={imageUrl}
                loading={loading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


