import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Routes/Profile";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if (user){
    setUserName(user.displayName)
    setUserEmail(user.email)
    }})
  },[auth])

  const authUser = async (input, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
     auth.onAuthStateChanged(user=>{
      updateProfile(auth.currentUser,{
        displayName: input
      }).then(()=>{setUserName(user.displayName)})
     })
      setUserEmail(cred.user.email);
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
      console.log("user loged in:", logedIn.user);
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
    try{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUserEmail(result.user.email);
    setUserName(result.user.displayName);
  } catch (err){
    console.error(err)
    setError(err.message);
    setTimeout(() => {
      setError("");
    }, 3000);
  }};
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home user={userName} />} />
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
