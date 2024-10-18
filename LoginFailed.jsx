// import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginFailed = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/'); // Navigate back to login
  };

  return (
    <div>
      <h2>Login Failed</h2>
      <p>Incorrect username or password. Please try again.</p>
      <button onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};

export default LoginFailed;
