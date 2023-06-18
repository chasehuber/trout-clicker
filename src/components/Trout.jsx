import React, { useEffect, useState, useRef, useContext } from "react";
import troutPic from "../assets/trout.png"
import '../App.css'
import Cookies from "js-cookie";
import { PlayerContext } from "./PlayerContext";

function Trout({ storeOpen }) {
  const {fishCount, setFishCount, troutPerSec} = useContext(PlayerContext)

  return (
    <div className={storeOpen ? "trout-box-hidden" : "trout-box"}>
      <div className="w-full">
        <div onClick={() => setFishCount((fishCount + 1))} className="flex justify-center trout m-4">
          <img src={troutPic}/>
        </div>

        <div className="text-center text-5xl p-2 w-full bg-gray-800 bg-opacity-80">
          <h1>{Math.floor(fishCount)} Trout</h1>
          <h1 className="text-2xl">{(troutPerSec).toFixed(1)} TPS (Trout per second)</h1>
        </div>
      </div>
    </div>
  )
}

export default Trout