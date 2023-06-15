import React, { useEffect, useState, useRef } from "react";
import troutPic from "../assets/trout.png"
import '../App.css'
import Cookies from "js-cookie";

function Trout() {
  const [fishCount, setFishCount] = useState(0)

  // Checks to see if you have any fish in your count already
  // This is later going to move into its own function, might bring out useContext to have all of the 
  // user values accessible from one place.
  useEffect(() => {
    let cookieFishCount = parseInt(Cookies.get('Trout'))

    if(cookieFishCount > 0) {
      setFishCount(cookieFishCount)
    }
  }, [])

  // Borrowed this useInterval code from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  // Works the way I want it to, setInterval() sucks
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // Every 5 minutes this will update the 'Trout' cookie with how many trouts you have
  useInterval(() => {
    Cookies.set('Trout', fishCount)
    console.log("cookie set with value of " + fishCount)
  }, 120000)

  return (
    <div className="flex justify-center items-center trout-container border-x-2 col-start-2">
      <div className="w-full">
        <div onClick={() => setFishCount(fishCount + 1)} className="flex justify-center trout m-4">
          <img src={troutPic}/>
        </div>

        <div className="text-center text-5xl p-2 w-full bg-gray-800 bg-opacity-80">
          <h1>{fishCount} Trout</h1>
        </div>
      </div>
    </div>
  )
}

export default Trout