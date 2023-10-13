/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HistoryDisplay from './historydisplay';
import { fetchHistory } from './fetchhistory';
import Register from '../account/register';
import Login from '../account/login';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#64646434',
  boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
  color: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

function History() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userEmail = sessionStorage.getItem('userEmail');
  console.log('isLoggedIn:', isLoggedIn);
  const [assets, setAssets] = useState([]);

  const fetchAssets = (email) => {
    fetchHistory(email)
      .then((data) => {
        setAssets(data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch assets when the component mounts and the user is logged in
      if (userEmail) {
        console.log('history.js fetchAssets call:', userEmail);
        fetchAssets(String(userEmail));
      }
    }
  }, [isLoggedIn, userEmail]);

  const handleLoginSuccess = (email) => {
    console.log('handleLoginSuccess return');

    // Set the session variables
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
  };

  return (
    <>
      <div className="history-container">
        {isLoggedIn ? (
          // User is logged in
          <div className="history-container">
            {/* Grid for the title */}
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <div className="historyPage-title">
                  <h2>
                    Transaction History
                    <Divider />
                    <Typography
                      sx={{ mt: 0.2, ml: 1 }}
                      color="text.secondary"
                      display="block"
                      variant="caption"
                    ></Typography>
                  </h2>
                </div>
              </Grid>
            </Grid>
            {assets && assets.length > 0 ? (
              // User has transaction history, display it
              <Box sx={{ flexGrow: 1 }} style={{ paddingTop: '3vh', paddingBottom: '10vh', paddingLeft: 32, paddingRight: 16, backgroundColor: '#222' }}>
                <Grid container spacing={0}>
                  {assets.map((asset, index) => (
                    <Grid item xs={12} md={12} lg={12} xl={12} style={{ marginBottom: '2rem', paddingTop: '1vh' }}>
                      <HistoryDisplay key={index} {...asset} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              // User has no transaction history, display a message
              <div className="no-history-message">
                <p>You have no transaction history.</p>
              </div>
            )}
          </div>
        ) : (
          // User is not logged in, display register or login section
          <div className="register-container">
            <h1>Register or Login</h1>
            <Register />
            <Login onSuccessfulLogin={handleLoginSuccess} />
          </div>
        )}
      </div>
    </>
  );
}

export default History;