import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AssetDisplay from './assetdisplay.js';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fetchAssets } from './fetchassets';
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

function Assets() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail'));
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchAssets()
        .then((data) => {
          setAssets(data);
        })
        .catch((error) => {
          console.error('Error fetching assets:', error);
        });
    }
  }, [isLoggedIn, userEmail]);

  const handleLoginSuccess = (email) => {
    // Set the session variables
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const onPurchaseSuccess = () => {
    fetchAssets()
      .then((data) => {
        setAssets(data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  };


  const filteredAssets = assets.filter((asset) => {
    return (
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || asset.category === selectedCategory)
    );
  });

  return (
    <>
      <div className="asset-container">
        {isLoggedIn ? (
          <div className="asset-container">
            {/* Grid for the title */}
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <div className="assetsPage-title">
                  <h2>
                    Assets
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
            {/* Rest of your component content */}
            <Box
              sx={{
                flexGrow: 1,
                height: 'auto',
                overflowY: 'auto',
                paddingTop: '6vh',
                paddingBottom: '10vh',
                paddingLeft: 32,
                paddingRight: 16,
                backgroundColor: '#222',
              }}
            >
              <Grid container spacing={0} className="items-title">
                <Grid item xs={12} md={12}>
                  <Item className="items-title">
                    <h1>View our available items.</h1>
                  </Item>
                </Grid>
              </Grid>
              {/* Search and filter bar */}
              <div className="search-filter-container">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth className="form-assets">
                        <InputLabel className="white-text-center">Category</InputLabel>
                        <Select
                          value={selectedCategory}
                          className="white-text-center"
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value="Fiction">Fiction</MenuItem>
                          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ marginBottom: '2rem' }}>
                      <FormControl fullWidth className="form-assets">
                        <InputLabel className="white-text-center">Author</InputLabel>
                        <Select
                          value={selectedAuthor}
                          className="white-text-center"
                          onChange={(e) => setSelectedAuthor(e.target.value)}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value="Andrzej Sapkowski">Andrzej Sapkowski</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Display Assets */}
                    {filteredAssets.map((asset, index) => (
                      <Grid item xs={12} sm={12} lg={3} xl={3} style={{ marginBottom: '2rem', paddingTop: '6vh' }}>
                        <AssetDisplay key={index} {...asset} userEmail={userEmail} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </div>
            </Box>
          </div>
        ) : ( // User is not logged in, display register or login section
          <div className="register-container">
            <h1>Register or Login</h1>
            <Register />
            <Login onSuccessfulLogin={handleLoginSuccess} onPurchaseSuccess={onPurchaseSuccess} />
          </div>
        )}
      </div>
    </>
  );
}

export default Assets;
