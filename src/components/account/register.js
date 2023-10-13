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
    <div>
      <h2>Register</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>}
      <button onClick={handleRegister}>Register</button>
      {registrationResult && <p>{registrationResult}</p>}
    </div>
  );
}

export default Register;