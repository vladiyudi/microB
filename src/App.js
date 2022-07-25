import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from './Routes/Home.js'
import { BrowserRouter, Routes,
  Route, } from "react-router-dom";
  import Profile from "./Routes/Profile";
import { useState, useEffect } from "react";

function App() {

  const [userName, setUserName] = useState('')
  const handleProfile = (input)=>{
    setUserName(input)
  }
  
  return (
    <div className="App">
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element= { <Home user={userName}/> }/>
  <Route path="/Profile" element={ <Profile handleProfile={handleProfile}/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
