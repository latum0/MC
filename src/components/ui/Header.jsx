import React, { useState, useRef } from 'react';
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

  // Function to handle navigation to Home
  const homeHandler = () => {
    navigate(`/`);
  };

  // Function to handle link clicks
  const linkNavbar = (e, name) => {
    e.preventDefault();
    setLinks({
      home: name === 'home',
      about: name === 'about',
      contact: name === 'contact',
      signup: name === 'signup',
    });
  };

  // Fetch recommendations based on the query
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

  // Handle search input changes
  const handleInputChange = (e) => {
    const query = e.target.value;
    fetchRecommendations(query);
  };

  // Handle search submission
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

        {/* Search and Icons */}
        <div className="navbar-right">
          {/* Search Input */}
          <div className="input-div">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Que cherchez-vous ?"
                className="navbar-search"
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
                  <li
                    key={product._id}
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setShowRecommendations(false);
                    }}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Favorite and Cart Icons */}
          <MdFavoriteBorder className="fav-logo" />
          <MdOutlineShoppingCart className="cart-logo" />
        </div>
      </header>
    </div>
  );
};

export default Header;