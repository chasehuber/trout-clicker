import React, { useEffect, useState, useRef, useContext } from "react";
import troutPic from "../assets/trout.png"
import '../App.css'
import Cookies from "js-cookie";
import { PlayerContext } from "./PlayerContext";

function Trout({ storeOpen }) {
  const {fishCount, setFishCount} = useContext(PlayerContext)

  return (
    <div className={storeOpen ? "trout-box-hidden" : "trout-box"}>
      <div className="w-full">
        <div onClick={() => setFishCount((fishCount + 1))} className="flex justify-center trout m-4">
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