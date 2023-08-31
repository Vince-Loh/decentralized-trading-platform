/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import React, { Component } from "react";
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import './navbarstyles.css';
import { MenuData } from './menudata.js';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';

// Navbar component
class Navbar extends Component { 
  state = { clicked: false }; // Navbar state
  handleClick = () => { // Navbar click handler function, and set state to opposite of current state
    this.setState({ clicked:
       !this.state.clicked })
    }

  render() {

    // Menu icon and close icon for smaller screen sizes
    const menuIcon = <MenuRoundedIcon />;
    const closeIcon = <CloseRoundedIcon />;

    return (
      <nav className="Navbaritems">
        <h1 className="logo">
          GRP21 <Link to="/home" style={{ textDecoration: 'none' }}>   <CameraRoundedIcon className="camera-rounded" style={{ verticalAlign: 'middle', color: '#2B86C5'}} /> </Link>
        </h1>

         <div className="menu-icons" onClick={this.handleClick}>
              <Icon className={this.state.clicked ? 'close-icon' : 'menu-icon'}>
                {this.state.clicked ? closeIcon : menuIcon}
              </Icon>
         </div>  

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
            {MenuData.map((item, index) => 
              {
                return (
                <li key={index}>
                    <a href={item.url} className={item.cName}>
                        {item.icon}
                        <span>{item.title}</span>
                    </a>
                </li>
            );
            })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
