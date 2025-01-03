//import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Menu = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full z-20 sm:hidden"
        >
          <div className="gap-5 items-center py-10 m-6 text-xl rounded-3xl bg-blue-700 font-medium text-white">
            <ul className="flex flex-col gap-5 items-center">
              <li>
                <a href="#" className="hover:text-gray-900 text-bold">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 text-bold">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 text-bold">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
