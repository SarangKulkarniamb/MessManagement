import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { motion } from "framer-motion";
const SwipeSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="container py-12">
      <h2 className="text-3xl text-center font-semibold text-blue-950 mb-8">
        Explore Our Features
      </h2>

      <div className="flex items-center justify-center gap-4">
        {!isMobile && (
            <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}>
            <button onClick={() => sliderRef.current.slickPrev()} className="text-4xl text-blue-950">
                <IoMdArrowDropleftCircle />
            </button>
          </motion.div>
        )}
        <div className="w-3/4">
          <Slider ref={sliderRef} {...settings}>
            <div>
              <div className="bg-blue-700 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-semibold">Feature 1</h3>
                <p className="mt-4">Details about feature 1...</p>
              </div>
            </div>
            <div>
              <div className="bg-green-700 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-semibold">Feature 2</h3>
                <p className="mt-4">Details about feature 2...</p>
              </div>
            </div>
            <div>
              <div className="bg-orange-700 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-semibold">Feature 3</h3>
                <p className="mt-4">Details about feature 3...</p>
              </div>
            </div>
          </Slider>
        </div>
        {!isMobile && (
            <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.8 }}>

                <button onClick={() => sliderRef.current.slickNext()} className="text-4xl text-blue-950">
                    <IoMdArrowDroprightCircle />
                </button>

            </motion.div>
        )}
      </div>
    </div>
  );
};

export default SwipeSection;
