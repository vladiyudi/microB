import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { TweetContext } from "../Routes/Home";
import { useContext } from "react";
import {
  Provider,
  LikeButton,
  ClapButton,
  templates,
  Twitter,
} from "@lyket/react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


export default function Tweet({ tweet }) {
  const { myTweets, handleLike, likeSort } = useContext(TweetContext);
  const [liked, setLiked] = useState(false)

  useEffect(()=>{  
    const filt = tweet.liked?.filter((el)=>
      el===tweet.id
    )
    filt && filt.length && setLiked(true)
  },[tweet])

  return (
    <div className={likeSort && !liked? "d-none":"undefined"}>
    <div className={myTweets ? "tweetItem myTweet" : "tweetItem" }>
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
          <IconButton color={liked?"warning":"info"} onClick={() => {
             setLiked(!liked)
             handleLike(tweet.id, !liked)
              }}
              >
           <ThumbUpOffAltIcon/>
          </IconButton>
        </div>
      </div>
    </div>
    </div>
  );
}
