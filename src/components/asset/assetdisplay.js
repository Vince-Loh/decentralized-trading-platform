import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button'; // Import Button from MUI
import axios from 'axios'; // Import Axios for making the purchase request
import "./assetstyles.css";

// Styling for the image
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function AssetDisplay(props) {
  // Function to handle the purchase
  const handlePurchase = () => {
    // Make a request to the backend to initiate the purchase
    axios
      .post('http://127.0.0.1:8000/purchase', { isbn: props.isbn, price: props.price }) // Adjust the endpoint and payload as needed
      .then((response) => {
        // Handle the response, e.g., update UI or show a success message
        console.log('Purchase successful:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Purchase failed:', error);
      });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        minWidth: 300,
        flexGrow: 1,
        backgroundColor: '#64646434',
        boxShadow: '0 4px 8px rgba(99, 98, 98, 0.336)',
        color: '#fff'
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 96, height: 96 }}>
            <Img alt="Asset Image" src={props.img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" className="asset-title">
                {props.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Author: {props.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="asset-id">
                ISBN: {props.isbn}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="asset-category">
                Category: {props.category}
              </Typography>
            </Grid>
            <Grid item>
              {/* Display a Purchase button */}
              <Button variant="contained" onClick={handlePurchase} className="asset-purchase-btn">
                Purchase for {props.price}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className="asset-price" variant="subtitle1" component="div">
              {props.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
