import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function TweetInput({ handleButton, error, loading}) {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="Tweet">
      <textarea
        value={input}
        maxLength={141}
        className="input"
        placeholder="What you have in mind..."
        onChange={handleInput}
      />
      <div className="extraChars">
        <span >
            <span className={input.length < 141 ?"d-none":"none"}>The tweet can't containt more than 140 chars.</span> 
            {error?<span>{error}</span>: <span className="d-none">{error}</span> }
            {/* <span>{error}</span> */}
            </span>
      <Button
        disabled={input.length > 140 || error || loading ? true : false}
        variant="primary"
        className="tweetBtn"
        onClick={() => {
          handleButton(input);
          setInput("");
        }}
      >
        Tweet
      </Button>
      </div>
    </div>
  );
}
