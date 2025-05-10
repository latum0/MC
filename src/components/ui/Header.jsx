import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState(null);
  const [user, setUser] = useState(null); // Track authentication state
  const [links, setLinks] = useState({
    home: true,
    about: false,
    contact: false,
    signup: false,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const inputRef = useRef(null);

  // Check if user is logged in (get token)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchSellerProfile(token);
    } else {
      setUser(null); // User is not authenticated
      setSellerId(null); // No seller ID
    }
  }, []);

  // Fetch seller profile
  const fetchSellerProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const userData = await res.json();
      setUser(userData); // Set user data
      setSellerId(userData._id); // Set seller ID
    } catch (err) {
      console.error("Error fetching seller ID:", err.message);
      setUser(null);
      setSellerId(null);
    }
  };

  // Handle navigation to Dashboard (Protected)
  const handleDashboardNavigation = () => {
    if (user && sellerId) {
      navigate(`/DashboardSeller/${sellerId}`);
    } else {
      alert("You must be logged in to access the seller dashboard.");
      navigate("/login");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT
    setUser(null); // Clear user state
    setSellerId(null); // Clear seller ID
    navigate("/login"); // Redirect to login
  };

  const linkNavbar = (e, name) => {
    e.preventDefault();
    setLinks({
      home: name === "home",
      about: name === "about",
      contact: name === "contact",
      signup: name === "signup",
    });

    if (name === "signup") {
      navigate("/login");
    } else {
      navigate(`/${name === "home" ? "" : name}`);
    }
  };

  const fetchRecommendations = async (query) => {
    if (!query.trim()) {
      setRecommendations([]);
      setShowRecommendations(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const result = await response.json();
      setRecommendations(result.data.slice(0, 5));
      setShowRecommendations(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
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
      inputRef.current.value = "";
    }
  };

  return (
    <div className="nav-container">
      <header className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src="/src/assets/logoMC.png" alt="Logo" className="logo-img" />
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <a href="/" onClick={(e) => linkNavbar(e, "home")}>
            Home {links.home && <div className="lineUnder"></div>}
          </a>
          <a href="/About" onClick={(e) => linkNavbar(e, "about")}>
            About {links.about && <div className="lineUnder"></div>}
          </a>
          <a href="/Contact" onClick={(e) => linkNavbar(e, "contact")}>
            Contact {links.contact && <div className="lineUnder"></div>}
          </a>

          {!user && (
            <a href="/login" onClick={(e) => linkNavbar(e, "signup")}>
              Login {links.signup && <div className="lineUnder"></div>}
            </a>
          )}
        </nav>

        {/* Search and Icon Options */}
        <div className="navbar-right">
          <div className="input-div">
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              className="navbar-search"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <img src="/src/assets/search.png" alt="search" onClick={handleSearch} />
          </div>

          {/* Fav-logo navigates to Seller Dashboard ONLY if logged in */}
          {user && (
            <MdFavoriteBorder
              onClick={handleDashboardNavigation}
              className="fav-logo"
              title="Seller Dashboard"
            />
          )}

          <MdOutlineShoppingCart className="cart-logo" />

          {user ? (
            <>
              <MdAccountCircle
                className="profile-logo"
                onClick={() => navigate("/account")}
                title="Mon Compte"
              />
              <MdLogout className="logout-icon" onClick={handleLogout} title="Déconnexion" />
            </>
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default Header;
