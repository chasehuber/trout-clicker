import React, { useContext, useEffect, useState, useRef } from "react";
import Upgrade from "./Upgrade";
import data from "../assets/upgrades.json"
import { PlayerContext } from "./PlayerContext";

function UpgradeContainer({ storeOpen }) {
  const [upgrades, setUpgrades] = useState([])

  useEffect(() => {
    setUpgrades(Object.entries(data))
  },[])

  let upgradeArray = upgrades.map((upgrade, index) => (
    <div key={index} >
      <Upgrade upgradeData={upgrade[1]}/>
    </div>
  ))
  

  return (
    <div className={ storeOpen ? "mobile-upgrade-store" : "upgrade-container" }>
      <div className="shop-banner flex justify-center border-2 border-red-500 h-20">
        <h1 className="inline-block text-center self-center text-2xl p-2">Bait and Tackle</h1>
      </div>
      <div>
        {upgradeArray}
      </div>
    </div>
  )
}

export default UpgradeContainer