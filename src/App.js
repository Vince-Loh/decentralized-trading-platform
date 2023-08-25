<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Using Routes instead of Switch
import Navbar from './components/navbar/navbar.js';
import Home from './components/home/home.js';
import Assets from './components/asset/assets.js';

function App() {
  return (
    <Router>
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/assets" element={<Assets />} />
            </Routes>
        </div>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
