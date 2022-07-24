import logo from "./logo.svg";
import "./App.css";
import TweetInput from "./Components/TweetInput";
import TweetList from "./Components/TweetList";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tweets, setTweets] = useState(localStorage.getItem("tweets") ? JSON.parse(localStorage.getItem("tweets")):[]);

  useEffect(()=>{
    if (tweets.length!==0){
      localStorage.setItem("tweets", JSON.stringify(tweets))
    }
  }, [tweets])

  const handleButton = (input) => {
    const tweet = [{ key: nanoid(), text: input, name: "Vladi", time: new Date().toLocaleString() }, ...tweets];
    setTweets(tweet);
  };
  return (
    <div className="App">
      <TweetInput handleButton={handleButton} />
      <TweetList tweets={tweets}/>
    </div>
  );
}

export default App;
