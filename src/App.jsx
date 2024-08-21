import { useState } from 'react'
import './App.css'
import Header from './Components/Layout/Header/'
import Layout from './Components/Layout/Layout'

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
