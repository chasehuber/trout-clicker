import React, { useEffect, useState, useRef, useContext } from "react";
import troutPic from "../assets/trout.png"
import '../App.css'
import Cookies from "js-cookie";
import { PlayerContext } from "./PlayerContext";

function Trout({ storeOpen }) {
  const {fishCount, setFishCount, troutPerSec} = useContext(PlayerContext)

  // This calculates how many trout should be displayed, once you hit millions, billions, etc. it turns into 1.1 million
  // and so on.
  function displayedTrout() {
    // According to someone on stack overflow, this would be faster than a switch statement
    if(fishCount >= 1000000 && fishCount < 1000000000) {
      let fixedAmount = (fishCount * 0.000001).toString().substring(0,5)
      return(`${fixedAmount} Million`)
    }

    if(fishCount >= 1000000000 && fishCount < 1000000000000) {
      let fixedAmount = (fishCount * 0.000000001).toString().substring(0,5)
      return(`${fixedAmount} Billion`)
    }

    if(fishCount >= 1000000000000 && fishCount < 1000000000000000) {
      let fixedAmount = (fishCount * 0.000000000001).toString().substring(0,5)
      return(`${fixedAmount} Trillion`)
    }

    if(fishCount >= 1000000000000000 && fishCount < 1000000000000000000) {
      let fixedAmount = (fishCount * 0.000000000000001).toString().substring(0,5)
      return(`${fixedAmount} Quadrillion`)
    }

    if(fishCount > 1000000000000000000) {
      return("Stop clicking... please....")
    }

    else {
      return(Math.floor(fishCount))
    }
  }

  return (
    <div className={storeOpen ? "trout-box-hidden" : "trout-box"}>
      <div className="w-full">
        <div onClick={() => setFishCount((fishCount + 1))} className="flex justify-center trout m-4">
          <img src={troutPic}/>
        </div>

        <div className="text-center text-5xl p-2 w-full bg-gray-800 bg-opacity-80">
          <h1>{displayedTrout()} Trout</h1>
          <h1 className="text-2xl">{(troutPerSec).toFixed(1)} TPS (Trout per second)</h1>
        </div>
      </div>
    </div>
  )
}

export default Trout