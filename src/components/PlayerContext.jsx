import React, { createContext, useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

const PlayerContext = createContext()

function PlayerProvider({ children }) {
  const [fishCount, setFishCount] = useState(0)
  const [upgradeSave, setUpgradeSave] = useState([])
  const [troutPerSec, setTroutPerSec] = useState(0.0)
  const [lastSaved, setLastSaved] = useState("")

  const date = new Date()

  // All of the "player context" stuff is kind of acting as a big event handler, idk if that is good practice

  // Be careful fucking with this stuff, it checks for the save file stuff and updates
  // state of certain objects accordingly
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('upgrades'))) {
      setUpgradeSave(JSON.parse(window.localStorage.getItem('upgrades')))
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

  // Every x minutes this will update the 'Trout' cookie with how many trouts you have (This is your autosave)
  useInterval(() => {
    Cookies.set('Trout', fishCount)
    Cookies.set('TPS', troutPerSec)
    if(upgradeSave) {
      localStorage.setItem('upgrades', JSON.stringify(upgradeSave))
    }
    setLastSaved(date)
  }, 60000)

  return(
    <PlayerContext.Provider value={{ fishCount, setFishCount, upgradeSave, setUpgradeSave, troutPerSec, setTroutPerSec, lastSaved }}>
      { children }
    </PlayerContext.Provider>
  )
}

export { PlayerContext, PlayerProvider}