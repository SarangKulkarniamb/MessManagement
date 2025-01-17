import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authAtom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

const Logout = () => {
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      setAuthState({ isAuthenticated: false, user: null });
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    handleLogout(); 
  }, []);

  return <div>Logging out...</div>; 
};

export default Logout;