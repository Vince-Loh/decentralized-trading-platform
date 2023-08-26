import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import blockchainImage from './blockchain_2.jpg';
import './homestyles.css';

function Home() {
    return (
        <div className="home-container">
            <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <div className="hero-banner">
                        <h2>
                            Welcome To Our Platform<br />
                            <span style={{ color: '#222' }}>
                                Discover your <span style={{ color: '#2B86C5' }}>assets of interest</span> and trade them with ease
                            </span>
                        </h2>
                        <Link to="/assets" style={{ textDecoration: 'none'}}>
                            <Button variant="contained" color="primary">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={9} sm={6} alignItems="center" justifyContent="center">
                    <img src={blockchainImage} alt="Blockchain" className="imgBlockchain" />
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
