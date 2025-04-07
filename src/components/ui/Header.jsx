import React, { useState, useRef } from 'react';
import './Header.css'; 
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';


const Header = () => {
  const [links, setLinks] = useState({
    home: true,
    about: false,
    contact: false,
    signup: false,
  });
  const navigate = useNavigate();
  const homeHandler = ()=>{
    navigate(`/`)
  }


  const inputRef = useRef(null);

  const linkNavbar = (e, name) => {
    e.preventDefault(); 
    setLinks({
      home: name === 'home',
      about: name === 'about',
      contact: name === 'contact',
      signup: name === 'signup',
    });
  };

  return (
    <div className="nav-container">
      <header className="navbar">
        <div className="navbar-logo" onClick={homeHandler}>
           <img src="src/assets/logoMC.png" alt="Logo" className="logo-img" /> 
          
        </div>

        <nav className="navbar-links">
          <a href="/" onClick={(e) => linkNavbar(e, 'home')}>
            Home {links.home && <div className="lineUnder"></div>}
          </a>
          <a href="/about" onClick={(e) => linkNavbar(e, 'about')}>
            About {links.about && <div className="lineUnder"></div>}
          </a>
          <a href="/contact" onClick={(e) => linkNavbar(e, 'contact')}>
            Contact {links.contact && <div className="lineUnder"></div>}
          </a>
          <a href="/signup" onClick={(e) => linkNavbar(e, 'signup')}>
            Sign Up {links.signup && <div className="lineUnder"></div>}
          </a>
        </nav>

        <div className="navbar-right">
          <div className="input-div" >
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              className="navbar-search"
              ref={inputRef}
            />
            <img src="src/assets/search.png" alt="search" />
          </div>
          <MdFavoriteBorder className="fav-logo" />
          <MdOutlineShoppingCart className="cart-logo" />
        </div>
      </header>
    </div>
  );
};

export default Header;
