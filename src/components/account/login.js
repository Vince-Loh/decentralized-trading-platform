import React, { useState } from 'react';
import axios from 'axios';

function Login({ onSuccessfulLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });

      if (response.data === 'success') {
        setLoginResult('Login successful.');
        console.log('Login successful -- returning');

        console.log(sessionStorage.getItem('isLoggedIn'))
        console.log(sessionStorage.getItem('userEmail'))

        onSuccessfulLogin(email); // Call the prop function when login is successful
      } else if (response.data === 'failure') {
        setLoginResult('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loginResult && <p>{loginResult}</p>}
    </div>
  );
}

export default Login;