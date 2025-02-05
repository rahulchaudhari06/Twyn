import { useState } from 'react'
import Footer from './Components/Footer'
import HomePage from './Components/HomePage'
import { NavbarSimple } from './Components/Navbar'
import BackgroundImage from './Components/BackgroundImage'
import './App.css'

function App() {
  const [mode, setMode] = useState("Dark")

  return(
    <div className='overflow-hidden h-screen' >
      <NavbarSimple mode={mode} setMode={setMode} className="bg-dark" />
      <BackgroundImage mode={mode}>
        <div className="flex justify-center items-center min-w-64 min-h-screen">
          <HomePage />
        </div>
      </BackgroundImage>
      <Footer></Footer>

    </div>
  )
}

export default App
