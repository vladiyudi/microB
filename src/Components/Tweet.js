import React from 'react'
import { TweetContext } from '../Routes/Home'

export default function Tweet({tweet}) {
  return (
    <div className='tweetItem'>
        <div>
         <span> {tweet.userName} </span> 
         <span> {tweet.date} </span> 
         </div>
      <div> {tweet.content} </div> 
        </div>
  )
}
