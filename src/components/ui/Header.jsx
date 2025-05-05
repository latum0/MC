// Header.js
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [links, setLinks] = useState({
    home: true,
    about: false,
    contact: false,
    signup: false,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Load cart count dynamically
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCartCount = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const cart = await res.json();
          setCartCount(cart?.items?.length || 0);
        } catch (err) {
          console.error("Failed to load cart", err);
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartCount(guestCart.length);
      }
    };

    loadCartCount();

    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
        setCartCount(guestCart.length);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);

  }, []);

  const homeHandler = () => {
    navigate(`/`);
  };

  const linkNavbar = (e, name) => {
    e.preventDefault();
    setLinks({
      home: name === 'home',
      about: name === 'about',
      contact: name === 'contact',
      signup: name === 'signup',
    });
  };

  const fetchRecommendations = async (query) => {
    if (!query.trim()) {
      setRecommendations([]);
      setShowRecommendations(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const result = await response.json();
      setRecommendations(result.data.slice(0, 5));
      setShowRecommendations(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
      setRecommendations([]);
      setShowRecommendations(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    fetchRecommendations(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowRecommendations(false);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="nav-container">
      <header className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={homeHandler}>
          <img src="src/assets/logoMC.png" alt="Logo" className="logo-img" />
        </div>

        {/* Navigation Links */}
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

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search Input */}
          <div className="input-div">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Que cherchez-vous ?"
                ref={inputRef}
                onChange={handleInputChange}
              />
              <button type="submit" className="search-button">
                <img src="src/assets/search.png" alt="search" />
              </button>
            </form>

            {/* Recommendations Dropdown */}
            {showRecommendations && recommendations.length > 0 && (
              <ul className="recommendations-dropdown">
                {recommendations.map((product) => (
                  <li key={product._id} onClick={() => {
                    navigate(`/product/${product._id}`);
                    setShowRecommendations(false);
                  }}>
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Icons */}
          <MdFavoriteBorder className="fav-logo" />

          <div className="cart-icon-wrapper" onClick={() => navigate('/cart')}>
            <MdOutlineShoppingCart className="cart-logo" />
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;