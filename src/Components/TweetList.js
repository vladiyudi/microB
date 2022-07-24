import React from 'react'
import { useEffect } from 'react';
import Tweet from './Tweet';

export default function TweetList({tweets}) {
  return (
    <div className='tweetList'>
        {tweets.map(tweet=>{
         return <Tweet key={tweet.key} tweet={tweet}/>
        })}
    </div>
  )
}
