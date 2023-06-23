import Header from "../components/Header";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Create a payload object to send with the request
    const payload = {
        username: username,
        password: password,
      };
  
      axios
      .post('http://localhost/api/adminlogin.php', payload)
      .then((response) => {
        console.log(response.data);
        // Check the response and navigate to WelcomePage if login is successful
        if (response.data === 'Login Successful') {
          navigate('/admin/dashboard');
        } else {
          setErrorMessage('Login Failed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex items-center bg-image justify-center min-h-screen">
        <Header/>
      <div className="w-96  bg-white rounded-md shadow-lg p-8 bg-opacity-40 m-10">
        <h1 className="text-2xl font-bold text-center text-emerald-900 mb-4">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className={`mb-4 ${shakeAnimation ? 'animate-shake' : ''}`}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border border-gray-300 rounded p-2 outline-none"
            />
          </div>
          
          <div className={`mb-4 ${shakeAnimation ? 'animate-shake' : ''} `}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded p-2 outline-none"
            />
          </div>
          {errorMessage && <p className="text-red-700 text-sm mb-4">{errorMessage}</p>}
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded p-2 font-bold">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
