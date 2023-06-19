import React, { createContext, useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

const PlayerContext = createContext()

function PlayerProvider({ children }) {
  const [fishCount, setFishCount] = useState(0)
  const [upgradeSaveInfo, setUpgradeSaveInfo] = useState([])
  const [troutPerSec, setTroutPerSec] = useState(0.0)
  const [lastSaved, setLastSaved] = useState("")

  const date = new Date()

  // All of the "player context" stuff is kind of acting as a big event handler, idk if that is good practice

  // Be careful fucking with this stuff, it checks for the save file stuff and updates
  // state of certain objects accordingly
  useEffect(() => {
    const localSave = JSON.parse(window.localStorage.getItem('save-file'))

    if(localSave) {
      setFishCount(localSave.fishCount)
      setUpgradeSaveInfo(localSave.upgrades)
    }

    else {
      createSaveFile()
    }

    if(Cookies.get('TPS')) {
      setTroutPerSec(parseFloat(Cookies.get('TPS')))
    }
  },[])

  // Borrowed this useInterval code from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  // Works the way I want it to, setInterval() sucks
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function createSaveFile() {
    let saveObject = (
      {      
        "fishCount": fishCount ,
        "troutPerSec": troutPerSec ,
        "upgrades": upgradeSaveInfo
      }
    )
    localStorage.setItem('save-file', JSON.stringify(saveObject))
  }

  // Every x minutes this will update the 'Trout' cookie with how many trouts you have (This is your autosave)
  useInterval(() => {
    createSaveFile()

    setLastSaved(date)
  }, 60000)

  return(
    <PlayerContext.Provider value={{ fishCount, setFishCount, upgradeSaveInfo, setUpgradeSaveInfo, troutPerSec, setTroutPerSec }}>
      { children }
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider}