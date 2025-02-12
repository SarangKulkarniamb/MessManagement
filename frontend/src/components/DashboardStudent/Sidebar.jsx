import { useState } from "react";
import { Menu, Home, Settings, BarChart } from "lucide-react";
import { motion } from "framer-motion";


function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <motion.div
      initial={{ width: 64 }}
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full bg-blue-950 text-white p-4 overflow-hidden"
    >
      <button onClick={toggleSidebar} className="mb-4">
        <Menu size={24} />
      </button>
      <nav className="flex flex-col space-y-4">
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
          <Home size={20} /> {isOpen && "Home"}
        </button>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
          <BarChart size={20} /> {isOpen && "Analytics"}
        </button>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700">
          <Settings size={20} /> {isOpen && "Settings"}
        </button>
      </nav>
    </motion.div>
  );
}


export default Sidebar;