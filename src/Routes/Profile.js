import React, { useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import GoogleButton from "react-google-button";
import Avatar from "@mui/material/Avatar";
import {Spinner} from "react-bootstrap";

export default function Profile({
  handleProfile,
  userName,
  handleLogout,
  logInUser,
  userEmail,
  error,
  handleGoogle,
  handleImageSubmit,
  imageUrl,
  loading
}) {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sw, setSw] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

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

  const handleProfileImage = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  return (
    <div className="profile ">
      <form className="d-flex flex-column  align-items-md-center mt-4 profileForm">
        <div className="w-50 d-flex flex-column formWrap">
          <div className="profCont d-flex align-items-center justify-content-between">
            <h1 className="inline">
              <b>Profile</b>
            </h1>
            <div className="d-flex flex-column align-items-end pt-3">
                <Avatar className="me-4 mb-2"
                  alt="Remy Sharp"
                  src={imageUrl}
                  sx={{ width: 100, height: 100 }}
                />
                <div className="d-flex  justify-content-end">
                <Spinner animation="grow" className={!loading?"d-none":"me-2 mt-1"}/>
                <FormControl className="browse" type="file" onChange={handleProfileImage} />
                <Button onClick={() => {
                  handleImageSubmit(profileImage);
                }}>Upload</Button>
                </div>
            </div>
          </div>
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
            placeholder={userEmail ? "Logged in" : "Enter password"}
            onChange={handlePassword}
            className="inputProfile text-white"
          />

          <div className="d-flex align-items-baseline justify-content-between mt-3 pe-2">
            <div className="d-flex">
              <Form.Check
                onChange={handleCheck}
                className="mt-1 signupLogin"
                type="switch"
                id="custom-switch"
              />
              <span className="ms-1 d-flex align-items-center ">
                <span className={sw ? "fw-bold" : undefined}>Signup </span>/{" "}
                <span className={!sw ? "fw-bold" : undefined}>Login</span>{" "}
              </span>
            </div>
            <GoogleButton
              className="rounded"
              onClick={() => {
                handleGoogle();
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
            disabled={!input && !email?true:false}
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
          <span className={error ? "pError mt-3" : "d-none"}>
            {error && error}
          </span>
        </div>
      </form>
    </div>
  );
}
