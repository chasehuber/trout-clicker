import React, { createContext, useState } from "react";

const PlayerContext = createContext()

function PlayerProvider({ children }) {
  const [fishCount, setFishCount] = useState(0)
  const [rodCount, setRodCount] = useState(0)

  return(
    <PlayerContext.Provider value={{ fishCount, setFishCount, rodCount, setRodCount }}>
      { children }
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider}