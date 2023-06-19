import { useState, useEffect, useRef, useContext } from 'react'
import './App.css'
import Trout from './components/Trout'
import UpgradeContainer from './components/UpgradeContainer'
import Cookies from 'js-cookie'
import { PlayerContext } from './components/PlayerContext'
import ShoppingIcon from './assets/ShoppingIcon'

function App() {
  const {fishCount, setFishCount, troutPerSec } = useContext(PlayerContext);
  const [storeOpen, setStoreOpen] = useState(false)
  const clickMultiplier = 1;

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
    setFishCount(fishCount + troutPerSec)
  }

  // Here is where the actual ticking is happening, this is the "game loop" if you want to call it that
  useInterval(() => {
    tick()
  }, 1000)

  return (
    <div className='game-container'>
      <ShoppingIcon storeOpen={storeOpen} setStoreOpen={setStoreOpen}/>
      <Trout clickMultiplier={clickMultiplier} storeOpen={storeOpen}/>
      <UpgradeContainer storeOpen={storeOpen}/>
    </div>
  )
}

export default App
