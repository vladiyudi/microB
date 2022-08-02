import React from 'react'
import Avatar from '@mui/material/Avatar';
import { TweetContext } from '../Routes/Home'
import { useContext } from 'react';

export default function Tweet({tweet}) {

  const {myTweets} = useContext(TweetContext)
 
  return (
    <div className={myTweets?"tweetItem myTweet":'tweetItem'}>
        <div>
          <div className='d-flex align-items-center'>
        <Avatar
        alt="Remy Sharp"
        src={tweet.photoUrl? tweet.photoUrl:"https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"}
        sx={{ width: 35, height: 35 }}
      />
         <span className='ms-2'> {tweet.userName} </span> 
         </div>
         <span> {tweet.date} </span> 
         </div>
      <div className='ms-5'> {tweet.content} </div> 
        </div>
  )
}
