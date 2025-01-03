import React from "react";
import { IoRestaurantSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Menu from "./Menu";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  function toggleMenu() {
    setOpen(!open);
  }
  let rotate = 180 * open;
  return (
    <>
      <nav className="border-b-2 border-gray-150">
        <div className="container flex justify-between items-center py-5">
          {/* Logo */}
          <div className="text-2xl flex gap-2 items-center">
            <IoRestaurantSharp />
            <p className="font-medium tracking-tighter">DigiMess</p>
          </div>

          {/* Links */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:block">
              <ul className="flex gap-5 items-center">
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <motion className="div">

            </motion>
            <div className="sm:hidden">
              <motion.div
                animate={{ rotate: rotate }}
                transition={{ duration: 0.4 }}
              >
                <button onClick={toggleMenu}>
                  <FiMenu />
                </button>
              </motion.div>
              
            </div>

            <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}>
              <button className="flex items-center justify-center text-lg bg-blue-950 text-white h-9 w-24 rounded-xl font-medium">
              Login
            </button>
            </motion.div>
            
          </div>
        </div>
      </nav>

      {/* Menu */}
      <Menu open={open}/>
    </>
  );
};

export default Navbar;
