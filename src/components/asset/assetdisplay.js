import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button'; // Import Button from MUI
import axios from 'axios'; // Import Axios for making the purchase request
import "./assetstyles.css";
import Web3 from 'web3';
import BookStore from '../../BookStore.json';
import { useEffect, useState } from 'react';



const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

const contractAddress = "0xA2B690363847F3B0d9D85e41af6E59c76c30e1fC"; // Replace with your contract's deployed address

const contract = new web3.eth.Contract(BookStore.abi, contractAddress);


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
    const promptedUserName = prompt("Please enter your name:");
        if (!promptedUserName) {
            alert("Name is required to proceed with the purchase.");
            return;
        }

        const promptedUserEmail = prompt("Please enter your email:");
        if (!promptedUserEmail) {
            alert("Email is required to proceed with the purchase.");
            return;
        }

        purchaseBook(props.isbn, props.title, props.price, promptedUserEmail, promptedUserName)
    };

  // Function to purchase a book
  async function purchaseBook(isbn, bookName, price, userEmail, userName) {

    const purchaseData = {
      isbn: isbn,
      price: price,
      purchased_by: userName,
      purchase_email: userEmail
    }
    // Make a request to the backend to initiate the purchase
    axios
      .post('http://127.0.0.1:8000/purchase', purchaseData) // Adjust the endpoint and payload as needed
      .then((response) => {
        // Handle the response, e.g., update UI or show a success message
        console.log('Purchase successful:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Purchase failed:', error);
      });

/*
    const accounts = await web3.eth.getAccounts();
    try {
      await contract.methods.purchaseBook(isbn, bookName, price, userEmail, userName)
        .send({ from: accounts[0],gas: 5000000 });
      alert("Purchase successful!");
    } catch (error) {
      throw new Error("Purchase failed: " + error.message);
    }*/
  }

    /* Function to fetch the purchase time of a book - can be used for history page 
  async function fetchPurchaseTime(isbn) {
    try {
        const timestamp = await contract.methods.getPurchaseTime(isbn).call();
        const purchaseTime = new Date(timestamp * 1000).toISOString();
        return purchaseTime;
    } catch (error) {
        console.error("Failed to fetch purchase time:", error);
        return null;
    }
  }

  const [purchaseTime, setPurchaseTime] = React.useState(null);

  React.useEffect(() => {
    async function retrievePurchasedTime() {
        const time = await fetchPurchaseTime(props.isbn);
        setPurchaseTime(time);
    }

    retrievePurchasedTime();
}, [props.isbn]);
  */

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
