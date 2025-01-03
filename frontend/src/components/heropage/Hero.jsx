import React from 'react'
import Swipe from './Swipe'
const Hero = () => {
  return (
    <>
        <div className='container mt-16 flex flex-col lg:flex-row items-center justify-center gap-12 py-12'>

            {/* Hero Section */}

                <div className='flex flex-col gap-10 text-center'>

                    <h1 className='text-4xl sm:text-5xl text-blue-950 font-semibold'>Streamline Your Campus Dining Experience!</h1>

                    <h3 className='text-md sm:text-xl'>Quick payments, easy scans, and hassle-free meals...</h3>

                </div>

        </div>
        <div>
            <Swipe/>
        </div>
    </>
  )
}

export default Hero