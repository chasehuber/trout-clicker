import { useState, useEffect, useRef, useContext } from 'react'
import './App.css'
import Trout from './components/Trout'
import UpgradeContainer from './components/UpgradeContainer'
import Cookies from 'js-cookie'
import { PlayerContext } from './components/PlayerContext'

function App() {
  const {fishCount, setFishCount, rodCount, setRodCount} = useContext(PlayerContext);
  const [autoClickCount, setAutoClickCount] = useState(0)
  const clickMultiplier = 1;

  // Checks to see if you have any fish in your count already
  // This is later going to move into its own function, might bring out useContext to have all of the 
  // user values accessible from one place.
  useEffect(() => {
    let cookieFishCount = parseInt(Cookies.get('Trout'))
    let cookieRodCount = parseInt(Cookies.get('Upgrades'))

    if(cookieFishCount > 0) {
      setFishCount(cookieFishCount)
    }

    setRodCount(cookieRodCount)
  }, [])

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

  // Game ticks once a second, this is where we will probably be doing the trout number adjustment
  function tick() {
    if(autoClickCount === 10) {
      setAutoClickCount(0)
      setFishCount(fishCount + rodCount)
      console.log("autoclicked")
    }
    else {
      setAutoClickCount(autoClickCount + 1)
    }
  }

  // Here is where the actual ticking is happening, this is the "game loop" if you want to call it that
  useInterval(() => {
    tick()
  }, 1000)

  // Every x minutes this will update the 'Trout' cookie with how many trouts you have (This is your autosave)
  useInterval(() => {
    Cookies.set('Trout', fishCount)
    Cookies.set('Upgrades', rodCount)
    console.log("cookie set with value of " + fishCount + " and " + rodCount + " rods")
  }, 30000)

  return (
    <div className='grid grid-cols-3 h-full row-span-1'>
      <Trout clickMultiplier={clickMultiplier}/>
      <UpgradeContainer/>
      <div className='row-start-1'>
        <h1>Rod count: {rodCount} </h1>
      </div>
    </div>
  )
}

export default App
