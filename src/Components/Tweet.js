import React from 'react'

export default function Tweet({tweet}) {
  return (
    <div className='tweetItem'>
        <div>
         <span> {tweet.name} </span> 
         <span> {tweet.time} </span> 
         </div>
      <div> {tweet.text} </div> 
        </div>
  )
}
