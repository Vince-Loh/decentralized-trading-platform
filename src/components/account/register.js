import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationResult, setRegistrationResult] = useState(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // Passwords don't match, display an error and reset password fields
      setPasswordsMatch(false);
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        email,
        password,
      });

      // Handle the response from the server
      if (response.data === 'Account already registered.') {
        setRegistrationResult('Account already registered.');
      } else if (response.data === 'Account registered.') {
        setRegistrationResult('Account registered successfully. Please login.');
        // You can redirect to a login page or perform other actions here
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', borderRadius: '4px', backgroundColor: '#fff', marginTop: '20px'}}>
      <h2>Register</h2>
      
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

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      
      {!passwordsMatch && <p style={{ color: 'red', marginBottom: '15px' }}>Passwords do not match. Please try again.</p>}
      
      <button onClick={handleRegister} style={{ padding: '8px 15px', background: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
        Register
      </button>
      
      {registrationResult && <p style={{ marginTop: '15px' }}>{registrationResult}</p>}
    </div>
  );
}

export default Register;