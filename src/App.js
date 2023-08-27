import './css/style.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom'; // Fixed the import here
import Navbar from './components/navbar/navbar.js';
import Home from './components/home/home.js';
import Assets from './components/asset/assets.js';
import Footer from './footer/footer.js';

function App() {
  return (
        <div className="App">
          <div className="main-container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/assets" element={<Assets />} />
            </Routes>
            <Footer />
          </div>
        </div>
  );
}

export default App;
