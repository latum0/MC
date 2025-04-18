import React, { useState, useRef } from 'react';
import './Header.css';
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [links, setLinks] = useState({
    home: true,
    about: false,
    contact: false,
    signup: false,
  });
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const homeHandler = () => {
    navigate('/');
    setLinks({
      home: true,
      about: false,
      contact: false,
      signup: false,
    });
  };

  const linkNavbar = (name) => {
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
          <img src="/src/assets/logoMC.png" alt="Logo" className="logo-img" />
        </div>

        <nav className="navbar-links">
          <Link
            to="/"
            onClick={() => linkNavbar('home')}
            className={links.home ? 'active-link' : ''}
          >
            Home
            {links.home && <div className="lineUnder"></div>}
          </Link>
          <Link
            to="/about"
            onClick={() => linkNavbar('about')}
            className={links.about ? 'active-link' : ''}
          >
            About
            {links.about && <div className="lineUnder"></div>}
          </Link>
          <Link
            to="/contact"
            onClick={() => linkNavbar('contact')}
            className={links.contact ? 'active-link' : ''}
          >
            Contact
            {links.contact && <div className="lineUnder"></div>}
          </Link>
          <Link
            to="/signup"
            onClick={() => linkNavbar('signup')}
            className={links.signup ? 'active-link' : ''}
          >
            Sign Up
            {links.signup && <div className="lineUnder"></div>}
          </Link>
        </nav>

        <div className="navbar-right">
          <div className="input-div">
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              className="navbar-search"
              ref={inputRef}
            />
            <img src="/src/assets/search.png" alt="search" />
          </div>
          <MdFavoriteBorder className="fav-logo" />
          <MdOutlineShoppingCart className="cart-logo" />
        </div>
      </header>
    </div>
  );
};

export default Header;