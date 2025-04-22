import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

// TODO: Handle token expiration
// TODO: Update file name
const LoginSuccess = () => {
  const navigate = useNavigate();
  const {setGithubUsername} = useUserStore();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const username = params.get('username');
    const localStorageToken = localStorage.getItem('authToken');

    

    if(username) {
      setGithubUsername(username);
    }
    if (localStorageToken) {
      navigate('/dashboard'); 
      return;
    }
    if (token) {
      // Store token in localStorage or a secure cookie
      localStorage.setItem('authToken', token);
      navigate('/dashboard'); // Redirect to a secure page
      return
    } else {
      navigate('/login'); // Redirect back to login on failure
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
