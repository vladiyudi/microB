import React from 'react'
import { useEffect, useContext } from 'react';
import Tweet from './Tweet';
import { TweetContext } from '../Routes/Home'

export default function TweetList() {
  const tweets = useContext(TweetContext)
  return (
    <div className='tweetList'>
        {tweets && tweets.map(tweet=>{
         return <Tweet key={tweet.id} tweet={tweet}/>
        })}
    </div>
  )
}
