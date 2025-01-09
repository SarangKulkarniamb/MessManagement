import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./Input";
import { Mail, Lock, User } from "lucide-react";
import {Link} from "react-router-dom"
import PasswordStrength from "./PasswordStrength";

const Form1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  return (
    <motion.div
      key="form1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Student</h2>
      <form>
        <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
            >
              <Link to="/register">
                <button className="flex items-center justify-center text-md bg-blue-950 text-white h-12 w-72 rounded-xl font-medium">
                  Submit
                </button>
              </Link>
         </motion.div>

         {/* password strength */}
         <PasswordStrength password={password}/>

      </form>
    </motion.div>
  );
};

const Form2 = () => {
  const [name, setName] = useState("");

  return (
    <motion.div
      key="form2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Mess</h2>
      <form>
        <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </motion.div>
  );
};

const SharedForm = () => {
    const [step, setStep] = useState(1);
  
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
        <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Choose your registration type
        </h1>
        <p className="text-lg text-gray-600 mb-6">
            Please select whether you're registering as a STUDENT or MESS OWNER.
        </p>
        </div>
  
        {/* Buttons for Step Selection */}
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={() => setStep(1)}
            className={`relative px-6 py-3 text-lg text-black font-medium rounded-lg transition-all duration-300`}
          >
            Student
            {step === 1 && (
              <motion.div
                className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </button>
  
          <button
            onClick={() => setStep(2)}
            className={`relative px-6 py-3 text-lg text-black font-medium rounded-lg transition-all duration-300`}
          >
            Mess
            {step === 2 && (
              <motion.div
                className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </button>
        </div>
  
        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && <Form1 />}
          {step === 2 && <Form2 />}
        </AnimatePresence>
      </div>
    );
  };
  
export default SharedForm;