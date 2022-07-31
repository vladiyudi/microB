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
  snapshot,
  onSnapshot,
  getDoc,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../fire.js";
import { getAuth } from "firebase/auth";

export const TweetContext = createContext([]);

export default function Home({ user, userRef }) {
  const [fireTweets, setFireTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const colRef = collection(db, "Tweets");
  const [liveServer, setLiveServer] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsub = onSnapshot(query(colRef), (doc) => {
      setLiveServer(doc);
    });
    return () => unsub();
  }, []);

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
      const tw = await Promise.all(
        liveServer.docs?.map(async (d) => {
          const id = d.data().uid;
          const userSnap = await getDoc(doc(db, "Users", id));
          const newObj = { userName: userSnap.data().displayName };
          const updatedTweet = Object.assign(d.data(), newObj);
          return updatedTweet;
        })
      );

      console.log("outside", tw);

      tw.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setFireTweets(tw.splice(0, 50));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

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

  // useEffect(() => {
  //   getSnapshot();
  // }, []);

  const handleButton = (input) => {
    const tweet = {
      uid: auth.currentUser.uid,
      id: nanoid(),
      content: input,
      userName: "",
      // user,
      date: new Date().toISOString(),
    };
    addToFirestore(tweet);
  };

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
      <TweetInput handleButton={handleButton} error={error} loading={loading} />
      <TweetContext.Provider value={fireTweets}>
        <TweetList />
      </TweetContext.Provider>
    </div>
  );
}

// const [serverTweets, setServerTweets] = useState([])

// const postToServer = async (tweet) => {
//   try {
//     setLoading(true);
//     const res = await fetch(
//       "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
//       {
//         method: "POST",
//         headers: { "Content-type": "application/json;charset=UTF-8" },
//         body: JSON.stringify({
//           content: tweet.content,
//           userName: tweet.userName,
//           date: tweet.date,
//           id: tweet.id,
//         }),
//       }
//     );
//     const data = await res.json();
//     if (!res.ok) {
//       setError("Error: " + data.message);
//       setTimeout(() => {
//         setError("");
//       }, 3000);
//       throw new Error(data.message);
//     }
//     setLoading(false);
//     setServerTweets([tweet, ...serverTweets]);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

// const getFromServer = async () => {
//   try {
//     setLoading(true);
//     const res = await fetch(
//       "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
//     );
//     if (!res.ok) throw new Error((err) => err.message());
//     const data = await res.json();
//     setServerTweets(data.tweets);
//     setLoading(false);
//     return data.tweets;
//   } catch (err) {
//     setError("Error: " + err);
//     setTimeout(() => {
//       setError("");
//     }, 3000);
//     console.log("error ", err);
//   }
// };

// useEffect(() => {
//   getFromServer();
//   const interval = setInterval(() => {
//     getFromServer();
//   }, 10000);
//   return () => clearInterval(interval);
// }, []);
