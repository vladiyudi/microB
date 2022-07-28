import "./App.css";
import Navbar from "./Components/Navbar";
import Home from './Routes/Home.js'
import { BrowserRouter, Routes,
  Route } from "react-router-dom";
import Profile from "./Routes/Profile";
import { useState, useEffect} from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";

import {db} from "./fire.js"
import Tweet from "./Components/Tweet";


function App() {

  const [userName, setUserName] = useState(  localStorage.getItem("Profile") ? JSON.parse(localStorage.getItem("Profile")):'Vladi')
  
  const handleProfile = (input)=>{
    localStorage.setItem("Profile", JSON.stringify(input))
    setUserName(input)
  }

  const colRef = collection(db, 'Tweets')
  const [fireTweets, setFireTweets] = useState([])

  const getSnapshot = async ()=>{
    try {
      const tw = []
   const snapshot = await getDocs(colRef)
   snapshot.forEach((doc)=>{
    tw.push({...doc.data(), id: doc.id})
   })
   tw.sort((a,b)=>{return new Date(b.date) - new Date(a.date)})
  setFireTweets(tw.splice(0, 50))
  }
   catch (err){ console.error(err.message)}
}

useEffect(()=>{
  getSnapshot()
}, [])


 
  return (
    <div className="App">
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element= { <Home user={userName} colRef={colRef} getSnapshot={getSnapshot} fireTweets={fireTweets}/> }/>
  <Route path="/Profile" element={ <Profile handleProfile={handleProfile} userName={userName}/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
