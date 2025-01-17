import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authAtom';
import axios from 'axios';


const CheckAuthStatus = () => {
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', { withCredentials: true });
        if (response.data.success) {
          setAuthState({ isAuthenticated: true, user: response.data.user });
        }
      } catch (error) {
        // Only mark as unauthenticated if it's a 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          setAuthState({ isAuthenticated: false, user: null });
        }
      }
    };
    

    checkAuth();
  }, [setAuthState]);

  return null;
};

export default CheckAuthStatus;