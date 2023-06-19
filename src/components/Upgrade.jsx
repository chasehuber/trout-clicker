import React, { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "./PlayerContext";

function Upgrade({ upgradeData }) {
  const {setFishCount, fishCount, upgradeSaveInfo, setUpgradeSaveInfo, troutPerSec, setTroutPerSec} = useContext(PlayerContext)
  const[upgradeCount, setUpgradeCount] = useState(0)
  const realCount = useRef();

  let baseCost = upgradeData.base_cost
  let cost = Math.ceil(baseCost * (1.15 ** (upgradeCount)))

  // This updates the item counts if there is a save file present
  useEffect(() => {
    if(upgradeSaveInfo) {
      let searchedArray = [...upgradeSaveInfo]

      let index = searchedArray.findIndex(upgrade => upgrade.name === upgradeData.name)

      if(index >= 0) {
        setUpgradeCount(searchedArray[index].count)
      }
    }
  },[])

  // This all handles purchasing the upgrade, it updates the TPS, fish count, and the upgrade count/cost
  function purchaseUpgrade() {
    if(fishCount < cost) {return}

    if(fishCount >= (upgradeCount === 0 ? baseCost : cost)) {
      setFishCount(fishCount - (upgradeCount === 0 ? baseCost : cost))
      setUpgradeCount(upgradeCount + 1)
      setTroutPerSec((troutPerSec + upgradeData.tps))
    }

    // This sets an initial save, without this single line of code, the saves for upgrades is very upset
    if(upgradeCount === 0) {setUpgradeSaveInfo([...upgradeSaveInfo, {name: upgradeData.name, count: 1}])}

    else {
      let newArray = [...upgradeSaveInfo]
      let index = newArray.findIndex(upgrade => upgrade.name === upgradeData.name)
      newArray[index] = {name: upgradeData.name, count: upgradeCount + 1}

      setUpgradeSaveInfo(newArray)
    }
  }

  return (
    <div className="upgrade-background">
      <div className={fishCount >= cost ? "upgrade" : "upgrade-unaffordable"} onClick={purchaseUpgrade}>
        <h1>{upgradeData.name}</h1>
        <h1>Cost: {upgradeCount === 0 ? baseCost : cost}</h1>
        <h1>Owned: {upgradeCount}</h1>
      </div>
    </div>
  )
}

export default Upgrade