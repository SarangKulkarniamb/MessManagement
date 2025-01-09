import React, { useState, useEffect } from 'react';
import {Check ,X} from 'lucide-react'
const PasswordStrength = ({ password }) => {
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('Weak');
  
    useEffect(() => {
      const evaluatePasswordStrength = (password) => {
        if (!password) {
          setScore(0);
          setFeedback('Weak');
          return;
        }
  
        let tempScore = 0;
  
        if (password.length > 8) tempScore += 1;
        if (/[a-z]/.test(password)) tempScore += 1;
        if (/[A-Z]/.test(password)) tempScore += 1;
        if (/\d/.test(password)) tempScore += 1;
        if (/[^A-Za-z0-9]/.test(password)) tempScore += 1;
  
        setScore(tempScore);
  
        if (tempScore <= 2) {
          setFeedback('Weak');
        } else if (tempScore <= 4) {
          setFeedback('Moderate');
        } else {
          setFeedback('Strong');
        }
      };
  
      evaluatePasswordStrength(password);
    }, [password]);

    const getFeedbackColor = () => {
        if (feedback === 'Weak') return 'text-red-500';
        if (feedback === 'Moderate') return 'text-yellow-500';
        if (feedback === 'Strong') return 'text-green-500';
    };
    
    return (

    <div className="mt-4">
        <div className="flex gap-5 justify-center">
        <h1>Password Strength:</h1>
        <p className={`${getFeedbackColor()} font-semibold`}>{feedback}</p>
    </div>
    <ul className="flex flex-col mt-4 text-sm gap-2">
      <li className={`flex items-center ${password.length > 8 ? 'text-green-400' : 'text-gray-400'}`}>
        {password.length > 8 ? <Check className="mr-2" /> : <X className="mr-2" />}
        {password.length > 8 ? 'Contains enough characters' : 'Password should have atleast 8 characters'}
      </li>
      <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
        {/[a-z]/.test(password) ? <Check className="mr-2" /> : <X className="mr-2" />}
        {/[a-z]/.test(password) ? 'Contains lowercase letters' : 'Password should have atleast lowercase letters'}
      </li>
      <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
        {/[A-Z]/.test(password) ? <Check className="mr-2" /> : <X className="mr-2" />}
        {/[A-Z]/.test(password) ? 'Contains uppercase letters' : 'Password should have atleast uppercase letters'}
      </li>
      <li className={`flex items-center ${/\d/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
        {/\d/.test(password) ? <Check className="mr-2" /> : <X className="mr-2" />}
        {/\d/.test(password) ? 'Contains numbers' : 'Password should have atleast numbers'}
      </li>
      <li className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
        {/[^A-Za-z0-9]/.test(password) ? <Check className="mr-2" /> : <X className="mr-2" />}
        {/[^A-Za-z0-9]/.test(password) ? 'Contains special characters' : 'Password should have atleast special characters'}
      </li>
    </ul>
  </div>
  
  );
};

export default PasswordStrength;
