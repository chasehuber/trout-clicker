import React, { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

function Upgrade() {
  const {setFishCount, fishCount, rodCount, setRodCount} = useContext(PlayerContext)
  let cost = 10

  function purchaseUpgrade() {
    if(fishCount >= cost) {
      setFishCount(fishCount - cost)
      setRodCount(rodCount + 1)
    }
  }

  return (
    <div className="border-2 border-red-500 text-center p-2 hover:bg-gray-600" onClick={purchaseUpgrade}>
      <h1>This is absolutely an upgrade</h1>
      <h1>Cost: {cost}</h1>
    </div>
  )
}

export default Upgrade