import React, { useState, useRef } from 'react';
import './Header.css';
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
import { MdAccountCircle } from "react-icons/md"; 
import { useNavigate } from 'react-router-dom';
>>>>>>> 97fae3ca88f5350a104ef203f8b1158465f0bcf6

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
<<<<<<< HEAD
      signup: false,
    });
  };

  const linkNavbar = (name) => {
=======
      signup: false
    });
  };

  const linkNavbar = (e, name) => {
    e.preventDefault();
>>>>>>> 97fae3ca88f5350a104ef203f8b1158465f0bcf6
    setLinks({
      home: name === 'home',
      about: name === 'about',
      contact: name === 'contact',
      signup: name === 'signup',
    });

    if (name === 'signup') {
      navigate('/login');
    } else {
      navigate(`/${name === 'home' ? '' : name}`);
    }
  };

  return (
    <div className="nav-container">
      <header className="navbar">
        <div className="navbar-logo" onClick={homeHandler}>
<<<<<<< HEAD
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
=======
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
          <a href="/login" onClick={(e) => linkNavbar(e, 'signup')}>
            Sign Up {links.signup && <div className="lineUnder"></div>}
          </a>
>>>>>>> 97fae3ca88f5350a104ef203f8b1158465f0bcf6
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
          {/*<MdAccountCircle className="profile-logo" />*/}
        </div>
      </header>
    </div>
  );
};

export default Header;