import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log(token,'token');
    if (token) {
      // Store token in localStorage or a secure cookie
      localStorage.setItem('authToken', token);
      navigate('/'); // Redirect to a secure page
    } else {
      navigate('/login'); // Redirect back to login on failure
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
