import React, { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

function Upgrade() {
  const {setFishCount, fishCount, rodCount, setRodCount} = useContext(PlayerContext)
  let baseCost = 15
  let cost = Math.ceil(baseCost * (1.15 ** (rodCount)))

  function purchaseUpgrade() {
    if(fishCount >= (rodCount === 0 ? baseCost : cost)) {
      setFishCount(fishCount - (rodCount === 0 ? baseCost : cost))
      setRodCount(rodCount + 1)
    }    
  }

  return (
    <div className="border-2 border-red-500 text-center p-2 hover:bg-gray-600" onClick={purchaseUpgrade}>
      <h1>This is absolutely an upgrade</h1>
      <h1>Cost: {rodCount === 0 ? baseCost : cost}</h1>
    </div>
  )
}

export default Upgrade