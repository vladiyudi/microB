import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function Profile({ handleProfile, userName }) {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="profile">
      <form className="d-flex flex-column w-75 align-items-md-center mt-4">
        <div className="w-50 d-flex flex-column ">
          <h1>
            <b>Profile</b>
          </h1>
          <label>User Name</label>
          <Form.Control
            value={input}
            placeholder={userName}
            onChange={handleInput}
            className="inputProfile"
          />
          <Button
            onClick={() => {
              handleProfile(input);
            setInput("")}}
            className="profileBtn"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
