import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContext";

function Upgrade({ upgradeData }) {
  const {setFishCount, fishCount, upgradeList, setUpgradeList} = useContext(PlayerContext)
  const[upgradeCount, setUpgradeCount] = useState(0)

  let baseCost = upgradeData.base_cost
  let cost = Math.ceil(baseCost * (1.15 ** (upgradeCount)))

  function purchaseUpgrade() {
    if(fishCount < cost) {return}

    if(fishCount >= (upgradeCount === 0 ? baseCost : cost)) {
      setFishCount(fishCount - (upgradeCount === 0 ? baseCost : cost))
      setUpgradeCount(upgradeCount + 1)
    }

    if(upgradeCount === 0) {setUpgradeList([...upgradeList, {name: upgradeData.name, count: 1}])}

    else {
      setUpgradeList(upgradeList.map(upgrade => {
        if(upgrade.name === upgradeData.name) {
          return {name: upgradeData.name, count: upgradeCount}
        }
      }))
    }
  }

  return (
    <div className="upgrade" onClick={purchaseUpgrade}>
      <h1>{upgradeData.name}</h1>
      <h1>Cost: {upgradeCount === 0 ? baseCost : cost}</h1>
    </div>
  )
}

export default Upgrade