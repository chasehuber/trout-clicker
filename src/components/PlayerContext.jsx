import React, { createContext, useState } from "react";

const PlayerContext = createContext()

function PlayerProvider({ children }) {
  const [fishCount, setFishCount] = useState(0)
  const [upgradeList, setUpgradeList] = useState([])

  return(
    <PlayerContext.Provider value={{ fishCount, setFishCount, upgradeList, setUpgradeList }}>
      { children }
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider}