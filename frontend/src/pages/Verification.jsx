import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import {motion} from 'framer-motion'
import { EmailVerificationPage } from '../components/verify/EmailVerificationPage'

const Verification = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white-50">
      <motion.div
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    },
                },
            }}>
            <Navbar />
        </motion.div>
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    },
                },
            }}
            className='flex justify-center h-screen items-center'>
                <EmailVerificationPage />
        </motion.div>
          
            <Footer />
      </motion.div>
    </div>

  )
}

export default Verification