/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button'; 
import axios from 'axios'; 
import "./assetstyles.css"

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function AssetDisplay(props) {

  const handlePurchase = () => {
    // handlePurchase function -- handles "purchase" button click
    const promptedWallet = prompt("Please provide your wallet address (0x.....):");
    if (!promptedWallet) {
      alert("Wallet is required to proceed with the purchase.");
      return;
    }

    const promptedWalletSecret = prompt("Please provide your wallet secret (longer 0x.....):");
    if (!promptedWallet) {
      alert("Wallet secret is required to proceed with the purchase.");
      return;
    }

    purchaseBook(props.isbn, props.price, props.userEmail, promptedWallet, promptedWalletSecret)
    };

  async function purchaseBook(isbn, price, userEmail, wallet, walletSecret) {

    const purchaseData = {
      isbn: isbn,
      price: price,
      purchase_email: userEmail,
      customer_wallet: wallet,
      customer_wallet_secret: walletSecret
    }
    axios
      .post('http://127.0.0.1:8000/purchase', purchaseData)
      .then((response) => {
        console.log('Purchase successful:', response.data);
        alert(response.data.message);
        window.location.href = '/assets'
        props.onPurchaseSuccess();
      })
      .catch((error) => {
        console.error('Purchase failed:', error);
      });
  }

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
              <Button variant="contained" onClick={handlePurchase} className="asset-purchase-btn">
                Purchase Now
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className="asset-price" variant="subtitle1" component="div">
              {props.price + ' ETH'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
