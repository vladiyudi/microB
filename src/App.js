import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Routes/Profile";
import { useState, useEffect } from "react";
import {getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { async } from "@firebase/util";


function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("Profile")
      ? JSON.parse(localStorage.getItem("Profile"))
      : "");
  const [userEmail, setUserEmail]=useState(localStorage.getItem("Email")
  ? JSON.parse(localStorage.getItem("Email"))
  : "")

  const [error, setError]=useState('')
  const auth = getAuth()

    const authUser = async (email, password)=>{
      try{
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      console.log("user created:", cred.user)
      setUserEmail(cred.user.email)
      } catch(err){
        console.error(err.message)
        // setError(err)  
      } }

    const handleLogout = async ()=>{
      try{
    const out = await signOut(auth);
  setUserEmail('')
  setUserName('')
      } catch (err){
        console.error("problem with logout: ", err.message)
        // setError(err)
         
      }
    }

  const handleProfile = (input, email, password) => {
    localStorage.setItem("Profile", JSON.stringify(input));
    localStorage.setItem("Email", JSON.stringify(email))
    setUserName(input);
    setUserEmail(email)
    authUser(email, password);
  };

  const logInUser = async (input, email, password)=>{
    try{
   const logedIn = await signInWithEmailAndPassword(auth, email, password)
   console.log("user loged in:", logedIn.user)
   setUserName(input);
    setUserEmail(email)
  }
   catch(err){
    console.log(err.message)
    // setError(err)
   }
  }

  const handleGoogle = async()=>{
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    console.log(result.user)
    setUserEmail(result.user.email)
    setUserName(result.user.displayName)
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // const user = result.user;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/Home" element={<Home user={userName} />} />
          <Route
            path="/"
            element={
              <Profile handleProfile={handleProfile} userName={userName} handleLogout={handleLogout} logInUser={logInUser} userEmail={userEmail} error={error} handleGoogle={handleGoogle}/>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
