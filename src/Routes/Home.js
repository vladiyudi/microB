import React from "react";
import TweetInput from "../Components/TweetInput.js";
import TweetList from "../Components/TweetList";
import { useEffect, useState, createContext } from "react";
import { nanoid } from "nanoid";
import Spinner from "react-bootstrap/Spinner";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  getDoc,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../fire.js";
import { getAuth } from "firebase/auth";
import InfiniteScroll from 'react-infinite-scroll-component'

export const TweetContext = createContext([]);

export default function Home({searchTweets, searchUsers}) {
  const [fireTweets, setFireTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const colRef = collection(db, "Tweets");
  const [liveServer, setLiveServer] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [latest, setLatest] = useState(5);
  const [myTweets, setMyTweets] =useState(false)

  useEffect(() => {
    const unsub = onSnapshot(
      query(colRef, orderBy("date", "desc"), limit(latest)),
      (doc) => {
        setLiveServer(doc);
      }
    );
    return () => unsub();
  }, [latest]);

  useEffect(() => {
    liveServer && getSnapshot();
  }, [liveServer]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, [auth]);

  const getSnapshot = async () => {
    try {
      setLoading(true);
      const tw = await Promise?.all(
        liveServer.docs?.map(async (d) => {
          const id = d?.data().uid;
          const userSnap = await getDoc(doc(db, "Users", id));
          const newObj = {
            userName: userSnap?.data().displayName,
            photoUrl: userSnap?.data().photoURL,
          };
          const updatedTweet = Object?.assign(d.data(), newObj);
          return updatedTweet;
        })
      );
      if (myTweets) {
        const showMyTweets = tw?.filter((el) => {
          return el.uid === auth?.currentUser?.uid;
        });
        setFireTweets(showMyTweets);
      }else if(searchTweets){
        const showSearchTweets = tw.filter(el=>{
          const reg = new RegExp(searchTweets, "gi")          
          if (reg.test(el.content))
          return el
        })
        setFireTweets(showSearchTweets)
      } else if (searchUsers){
        const showSearchUsers = tw.filter(el=>{
          const reg = new RegExp(searchUsers, "gi")
          if (reg.test(el.userName))
          return el})
        setFireTweets(showSearchUsers)
      }
      else setFireTweets(tw);
      setLoading(false);
    } 
    catch (err) {
      console.error(err.message);
      // setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    myTweets && setLatest(100) || searchUsers && setLatest(100) || searchTweets && setLatest(100)
    getSnapshot();
  }, [myTweets, searchUsers, searchTweets]);

  const addToFirestore = async (tweet) => {
    try {
      setLoading(true);
      const res = await addDoc(colRef, tweet);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error(err);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", loadMoreData);
    return () => window.removeEventListener("scroll", loadMoreData);
  });

  const loadMoreData = (e) => {
    window.scrollY >= 28 && setLatest(latest + 5);
  };

  const handleButton = (input) => {
    const tweet = {
      uid: auth.currentUser.uid,
      id: nanoid(),
      content: input,
      userName: "",
      date: new Date().toISOString(),
    };
    addToFirestore(tweet);
  };

  const handleMyTweets = ()=>{
    setMyTweets(!myTweets)
  }

  // const onScroll = (e) =>{
  //   console.log("scoll", e)
  // }

  return (
    <div>
      <div className="spinnerContainer">
        <Spinner
          id="spinner"
          className={loading ? "mt-2" : "d-none"}
          animation="grow"
          variant="secondary"
        />
      </div>
      <TweetInput handleButton={handleButton} handleMyTweets={handleMyTweets} myTweets={myTweets} error={error} loading={loading} />
      <TweetContext.Provider value={{fireTweets, myTweets}}>
        <TweetList />
      </TweetContext.Provider>
    </div>
  );
}
