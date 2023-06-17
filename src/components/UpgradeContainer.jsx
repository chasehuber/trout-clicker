import React, { useEffect, useState } from "react";
import Upgrade from "./Upgrade";
import data from "../assets/upgrades.json"

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
      <div className="shop-banner border-2 border-red-500">
        <h1 className="text-center text-2xl p-2">Bait and Tackle</h1>
      </div>
      <div>
        {upgradeArray}
      </div>
    </div>
  )
}

export default UpgradeContainer