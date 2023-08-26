import './css/style.css';
import { Route, Routes } from 'react-router-dom'; // Fixed the import here
import Navbar from './components/navbar/navbar.js';
import Home from './components/home/home.js';
import Assets from './components/asset/assets.js';
import Footer from './footer/footer.js';

function App() {
  return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/assets" element={<Assets />} />
            </Routes>
            <Footer />
        </div>
  );
}

export default App;
