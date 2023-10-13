/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar.js';
import Home from './components/home/home.js';
import Assets from './components/asset/assets.js';
import History from './components/history/history.js';
import Footer from './components/footer/footer.js';

class App extends Component {
  constructor(props) {
    super(props);

    // Check for the authentication state in session storage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userEmail = sessionStorage.getItem('userEmail');

    console.log('Initial state from session storage:', isLoggedIn, userEmail);

    this.state = {
      initialAuthState: {
        isLoggedIn,
        userEmail,
      },
    };
  }

  render() {
    const { isLoggedIn } = this.state.initialAuthState; // Access isLoggedIn from this.state

    return (
      <div className="App">
        <div className="main-container">
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
