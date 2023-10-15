/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import React, { useState } from 'react';
import axios from 'axios';

function Login({ onSuccessfulLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState(null);

  const handleLogin = async () => {
    try {
      // submit data to login endpoint
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });

      if (response.data === 'success') {
        // if login submission worked
        setLoginResult('Login successful.');
        console.log('Login successful -- returning');

        // set session variables to identify logged in state
        console.log(sessionStorage.getItem('isLoggedIn'))
        console.log(sessionStorage.getItem('userEmail'))

        onSuccessfulLogin(email);
      } else if (response.data === 'failure') {
        // login did not work
        setLoginResult('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', borderRadius: '4px', backgroundColor: '#fff', marginTop: '5%'}}>
      <h2>Login</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <button onClick={handleLogin} style={{ padding: '8px 15px', background: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
        Login
      </button>
      
      {loginResult && <p style={{ marginTop: '15px' }}>{loginResult}</p>}
    </div>
  );
}

export default Login;