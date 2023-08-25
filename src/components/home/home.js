import "./homestyles.css";
import { Link } from 'react-router-dom';
import React from 'react';
import blockchainImage from './blockchain_2.jpg';

function Home() {
    return (
        
            <div className="home-container">
                <div className="hero-banner">
                    <h2>
                        Welcome To Our Platform<br></br>
                        <span id="discover">Discover your <span id="ease">assets of interest</span> and trade them with ease</span> <br></br>
                        <Link to="/assets"><button className="btn btn-primary">Get Started</button></Link>
                    </h2>
                    <img src={blockchainImage} alt="Blockchain" width="600" className="imgBlockchain"/>
                </div>
            </div>
    );
}

export default Home;
