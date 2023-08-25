import React, { Component } from "react";
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import './navbarstyles.css';
import { MenuData } from './menudata.js';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked:
       !this.state.clicked })
    }

  render() {

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
