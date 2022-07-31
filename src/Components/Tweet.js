import React from 'react'
import Avatar from '@mui/material/Avatar';

export default function Tweet({tweet}) {
  return (
    <div className='tweetItem'>
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
