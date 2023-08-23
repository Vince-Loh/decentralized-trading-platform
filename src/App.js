import './App.css';
import Trade from './Trade.js';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Trade">Trade</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/trade" element = {<Trade />} />
      </Routes>
    </div>
  );
}

export default App;
