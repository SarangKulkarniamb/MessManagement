import React from 'react'
import Navbar from './components/navbar/Navbar'
import Hero from './components/heropage/Hero'
import Footer from './components/footer/Footer'
import { motion } from 'framer-motion'
function App() {


  return (
    <div className="min-h-screen overflow-x-hidden bg-blue-50">
      <motion.div
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <Navbar />
        <Hero />
        <Footer />
      </motion.div>
    </div>

  )
}

export default App
