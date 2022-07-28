import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import GoogleButton from "react-google-button";

export default function Profile({
  handleProfile,
  userName,
  handleLogout,
  logInUser,
  userEmail,
  error,
  handleGoogle,
}) {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sw, setSw] = useState(true);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheck = () => {
    setSw(!sw);
  };

  // useEffect(()=>{console.log(sw)}, [sw])

  return (
    <div className="profile">
      <form className="d-flex flex-column w-75 align-items-md-center mt-4">
        <div className="w-50 d-flex flex-column ">
          <h1>
            <b>Profile</b>
          </h1>
          <span>{error && error}</span>
          <label>User Name</label>
          <Form.Control
            value={input}
            placeholder={userName ? userName : "Enter user name"}
            onChange={handleInput}
            className="inputProfile text-white"
          />
        
          <label>Email and Password</label>
          <Form.Control
            value={email}
            type="email"
            placeholder={userEmail ? userEmail : "Enter email"}
            onChange={handleEmail}
            className="inputProfile text-white"
          />
          <Form.Control
            value={password}
            type="password"
            placeholder="Enter password"
            onChange={handlePassword}
            className="inputProfile text-white"
          />
         
          <div className="d-flex  justify-content-between mt-3 pe-2">
          <div className="d-flex">
            <Form.Check
              onChange={handleCheck}
              className="mt-1 signupLogin"
              type="switch"
              id="custom-switch"
            />
            <span className="ms-1">Signup / Login</span> 
            </div>
            <GoogleButton
            onClick={() => {
              handleGoogle()
            }}
          />
          </div>
          <Button
            onClick={() => {
              input && email && sw
                ? handleProfile(input, email, password)
                : logInUser(input, email, password);
              setEmail("");
              setPassword("");
              input && setInput("");
            }}
            className="profileBtn"
          >
            {sw ? "Sign Up" : "Log In"}
          </Button>
         
          <Button
            className="profileBtn"
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
}
