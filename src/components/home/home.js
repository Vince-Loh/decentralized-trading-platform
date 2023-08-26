import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import blockchainImage from './blockchain_2.jpg';
import './homestyles.css';
import Bitcoin3D from './1.png';
import Ethereum3D from './2.png';
import Cronos3D from './15.png';
import Litecoin3D from './3.png';
import USDT3D from './6.png';
import Polkadot3D from './12.png';

function Home() {
    return (
        <div className="home-container">
            <Grid container spacing={0} alignItems="center" justifyContent="center">
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
            <Grid container spacing={5} alignItems="center" justifyContent="center" style={{ backgroundColor: '#222'}}>
                <Grid item xs={12} sm={6}>
                    <div className="pop-container">
                        <h2 className='pop-container-title'>Explore Popular Coins</h2>
                        <h3 className='pop-container-title'>List of digital assets available for trading!</h3>
                        
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={Bitcoin3D} alt="Bitcoin" className="coin-image"/>
                                    <p className='coinName'>Bitcoin</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={Ethereum3D} alt="Ethereum" className="coin-image"/>
                                    <p className='coinName'>Ethereum</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={Cronos3D} alt="Cronos" className="coin-image"/>
                                    <p className='coinName'>Cronos</p>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={Litecoin3D} alt="Litecoin" className="coin-image"/>
                                    <p className='coinName'>Litecoin</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={USDT3D} alt="USDT" className="coin-image"/>
                                    <p className='coinName'>USDT</p>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <div className="coin-container">
                                    <img src={Polkadot3D} alt="Polkadot" className="coin-image"/>
                                    <p className='coinName'>Polkadot</p>
                                </div>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <Link to="/assets" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" style={{marginBottom: '2.5rem'}}>
                                Explore Coins
                            </Button>
                        </Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
