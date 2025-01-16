import React from 'react'
import {Routes , Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import { Verification } from './pages/Verification'
const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/verify" element={<Verification />} />
        </Routes>
    </>
  )
}

export default App