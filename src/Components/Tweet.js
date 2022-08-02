import React from "react";
import Avatar from "@mui/material/Avatar";
import { TweetContext } from "../Routes/Home";
import { useContext } from "react";
import { Provider, LikeButton } from "@lyket/react";
import { useState } from "react";

export default function Tweet({ tweet }) {
  const { myTweets } = useContext(TweetContext);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className={myTweets ? "tweetItem myTweet" : "tweetItem"}>
      <div>
        <div className="d-flex align-items-center">
          <Avatar
            alt="Remy Sharp"
            src={
              tweet.photoUrl
                ? tweet.photoUrl
                : "https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
            }
            sx={{ width: 35, height: 35 }}
          />
          <span className="ms-2"> {tweet.userName} </span>
        </div>
        <span> {tweet.date} </span>
      </div>
      <div className="ms-5 d-flex justify-content-between">
        <span className="pt-2">{tweet.content}</span>
        <div className="">
          <Provider apiKey="pt_07a9e76aec5647ffd925d2ea85e070"
            theme={{
              colors: {
                background:  "rgba(255, 224, 138, 0.4)",
                text: "grey",
                primary: "#b8fff3"
              }
            }}
          >
            <LikeButton id="how-to-reduce-footprint" namespace="post" />
          </Provider>
        </div>
      </div>
    </div>
  );
}
