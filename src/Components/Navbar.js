import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Navbar({ handleLogout, tweetSearch, userSearch, searchUsers, searchTweets}) {
  const [loginSignup, setLogingSignup] = useState(false);
  const [warning, setWarning] = useState(false);
  const [input, setInput] = useState('')
  const location = useLocation()
  const [here, setHere] = useState(false)


  useEffect(()=>{
   if (location.pathname==="/"){
    setHere(true)
   } else setHere(false)
  },[location])

  const updateWarning = (bool) => {
    setWarning(bool);
  };
  const handleHomeButton = () => {
    !auth.currentUser && updateWarning(true);
    setTimeout(() => {
      updateWarning(false);
    }, 3000);
  };
  const auth = getAuth();

  const handleLoginSignup = () => {
    setLogingSignup(true);
    setTimeout(() => {
      setLogingSignup(false);
    }, 3000);
  };

  const handleInput = (e)=>{
    setInput(e.target.value)
  }

  return (
    <div>
      <div className="navBar d-flex justify-content-between">
        <div className="h-75 navCont">
          <NavLink
            onClick={handleHomeButton}
            className={({ isActive }) =>
              isActive ? "text-white ms-4" : "ms-4"
            }
            to="/Home"
            id="nav"
          >
            Home
          </NavLink>
          <NavLink
            id="nav"
            className={({ isActive }) =>
              isActive ? "text-white ms-5" : "ms-5"
            }
            to="/"
          >
            Profile
          </NavLink>
        </div>
        <InputGroup className={auth.currentUser && !here  ? "ms-4 w-50" : "d-none" }>
          <Form.Control
            placeholder="Search..." value={input} onChange={handleInput}
          />
          <Button onClick={()=>{
            tweetSearch(input)
            setInput("")
          }} variant={!searchTweets?"outline-secondary":"warning"}>{!searchTweets?"Tweets":searchTweets}</Button>
          <Button onClick={()=>{
            userSearch(input)
            setInput("")
          }} variant={!searchUsers?"outline-secondary":"warning"} >
            {!searchUsers?"Users":searchUsers}
          </Button>
        </InputGroup>
        <p className={loginSignup ? "mt-3 ms-5 text-warning" : "d-none"}>
          Enter user name and email bellow
        </p>
        <p className={warning ? "mt-3 ms-5 text-warning" : "d-none"}>
          You must be logged in
        </p>
        <div className="d-flex align-items-center me-3">
          <Button
            onClick={handleLoginSignup}
            className={!auth.currentUser ? "text-white ms-2" : "d-none"}
          >
            Login
          </Button>
          <Button
            onClick={handleLoginSignup}
            className={!auth.currentUser ? "text-white m-2 me-3" : "d-none"}
          >
            Signup
          </Button>
          <p className="ms-2 me-2 mt-3">
            {auth.currentUser ? auth.currentUser.displayName : "User"}
          </p>
          <Avatar
            className="me-2 mb-1 border mt-1"
            alt="Remy Sharp"
            src={auth.currentUser ? auth.currentUser.photoURL : ""}
            sx={{ width: 35, height: 35 }}
          />
          <Button
            variant="secondary"
            onClick={handleLogout}
            className={auth.currentUser ? "text-white m-2" : "d-none"}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
