import React from 'react'
import TweetInput from "../Components/TweetInput.js";
import TweetList from "../Components/TweetList";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Spinner from 'react-bootstrap/Spinner';

export default function Home({user}) {

    const [tweets, setTweets] = useState(localStorage.getItem("tweets") ? JSON.parse(localStorage.getItem("tweets")):[]);

    const [serverTweets, setServerTweets] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    useEffect(()=>{
      tweets[0].content && 
      postToServer()
    },[tweets])
  
    const postToServer = async ()=>{
      try {
        setLoading(true)
      const res = await fetch ('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
      method: 'POST', 
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        content: tweets[0].content,
        userName: tweets[0].userName,
        date: tweets[0].date,
        id: tweets[0].id
      }) 
      })
      const data = await res.json()
      if (!res.ok) {
        setError("Error: " + data.message)
        setTimeout(()=>{
          setError('')
        }, 3000)
        throw new Error(data.message) }
      setLoading(false)
     setServerTweets((state)=>[tweets[0],...state])
  }
      catch (err){
        console.error(err)
      }
      finally{
        setLoading(false)
      }
    }
    const getFromServer = async ()=>{
      try{
        setLoading(true)
      const res = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet')
      if (!res.ok) throw new Error(err=>err.message())
      const data = await res.json()
      const sorted = data.tweets.sort((a,b)=>{return a.date-b.date})
      setServerTweets(sorted)
      setLoading(false)
     }
      catch (err){
        setError("Error: " + err)
        setTimeout(()=>{
          setError('')
        }, 3000)
        console.log("error ", err)
      } 
    }
    useEffect(()=>{
      getFromServer()
    },[])
  
    const handleButton = (input) => {
      const tweet = [{ id: nanoid(), content: input, userName: user, date: new Date().toISOString()}, ...tweets];
     setTweets(tweet);
    };

  return (
    <div>
 <div className="spinnerContainer">
       <Spinner id="spinner"
      className={loading?"mt-2":"d-none"} 
      animation="border" variant="warning" />
      </div>
      <TweetInput handleButton={handleButton} error={error} loading={loading}/>
      <TweetList tweets={serverTweets}/>
    </div>
  )
}
