import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import GoogleButton from "react-google-button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
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

  // useEffect(()=>{
  //   console.log("imU", imageUrl)
  // })

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
    console.log("click")
    if (e.target.files[0]) {
      // console.log(e.target.files[0])
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
            <div className="d-flex flex-column align-items-end">
              <Stack direction="row" spacing={1} className="justify-content-end me-2 w-25">
                <Avatar className="border"
                  alt="Remy Sharp"
                  src={imageUrl}
                  sx={{ width: 120, height: 120 }}
                />
              </Stack>
              <input onChange={handleProfileImage} type="file"></input>
              <Button onClick={() => {
                  handleImageSubmit(profileImage);
                }}>Upload</Button>
                
              <Spinner animation="grow" className={!loading &&"d-none"}/>
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
