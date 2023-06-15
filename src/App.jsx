import { useState } from 'react'
import './App.css'
import Trout from './components/Trout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='grid grid-cols-3 h-full'>
      <Trout />
    </div>
  )
}

export default App
