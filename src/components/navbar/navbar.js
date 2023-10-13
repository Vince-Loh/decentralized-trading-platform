import React, { useState } from "react";
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import './navbarstyles.css';
import { MenuData } from './menudata.js';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';

function Navbar() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  const menuIcon = <MenuRoundedIcon />;
  const closeIcon = <CloseRoundedIcon />;

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.href = '/home';
  }

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  return (
    <nav className="Navbaritems">
      <h1 className="logo">
        GRP21 <Link to="/home" style={{ textDecoration: 'none' }}>   <CameraRoundedIcon className="camera-rounded" style={{ verticalAlign: 'middle', color: '#2B86C5'}} /> </Link>
      </h1>

      <div className="menu-icons" onClick={handleClick}>
        <Icon className={clicked ? 'close-icon' : 'menu-icon'}>
          {clicked ? closeIcon : menuIcon}
        </Icon>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuData.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
        {isLoggedIn && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;