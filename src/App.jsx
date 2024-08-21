import { useState } from 'react'
import './App.css'
import Layout from './Components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
        <Layout />
    </div>
    
    <div>  
      <h1>Holidaze</h1>
    </div>
    </>
  )
}

export default App
