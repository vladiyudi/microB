import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";

export default function TweetInput({ handleButton, error, loading, handleMyTweets, myTweets}) {

  const auth = getAuth()
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
      <Button size="sm" onClick={handleMyTweets} disabled={!auth.currentUser?true:false} className='ms-2' variant={!myTweets?"secondary":"success"}>{!myTweets? "My Tweets":"All Tweets"}</Button>
        <span >
            <span className={input.length < 141 ?"d-none":"none"}>The tweet can't containt more than 140 chars.</span> 
            {error?<span>{error}</span>: <span className="d-none">{error}</span> }
            </span>
      <Button
        disabled={input.length > 140 || error || loading ? true : false}
        variant="primary"
        className="tweetBtn"
        onClick={() => {
          input && handleButton(input);
          setInput("");
        }}
      >
        Tweet
      </Button>
      </div>
    </div>
  );
}
