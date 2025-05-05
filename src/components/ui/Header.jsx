import { useState, useRef, useEffect } from "react"
import "./Header.css"
import { MdFavoriteBorder } from "react-icons/md"
import { MdOutlineShoppingCart } from "react-icons/md"
import { MdAccountCircle } from "react-icons/md"
import { MdLogout } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [links, setLinks] = useState({
    home: true,
    about: false,
    contact: false,
    signup: false,
  })
  const [recommendations, setRecommendations] = useState([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const homeHandler = () => {
    navigate("/")
    setLinks({
      home: true,
      about: false,
      contact: false,
      signup: false,
    })
  }

  const linkNavbar = (e, name) => {
    e.preventDefault()
    setLinks({
      home: name === "home",
      about: name === "about",
      contact: name === "contact",
      signup: name === "signup",

    })

    if (name === "signup") {
      navigate("/login")
    } else {
      navigate(`/${name === "home" ? "" : name}`)
    }
  }
  const goToAccountPage = () => {
    navigate("/AccountPage")
  }


  // Fetch recommendations based on the query
  const fetchRecommendations = async (query) => {
    if (!query.trim()) {
      setRecommendations([])
      setShowRecommendations(false)
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Failed to fetch recommendations")
      const result = await response.json()
      setRecommendations(result.data.slice(0, 5))
      setShowRecommendations(true)
    } catch (error) {
      console.error("Error fetching recommendations:", error.message)
      setRecommendations([])
      setShowRecommendations(false)
    }
  }

  const handleInputChange = (e) => {
    const query = e.target.value
    fetchRecommendations(query)
  }


  const handleSearch = (e) => {
    e.preventDefault()
    const query = inputRef.current.value.trim()
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
      setShowRecommendations(false)
      inputRef.current.value = ""
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    window.location.reload()
  }

  return (
    <div className="nav-container">
      <header className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={homeHandler}>
          <img src="src/assets/logoMC.png" alt="Logo" className="logo-img" />
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
          {!isLoggedIn && (
            <a href="/login" onClick={(e) => linkNavbar(e, "signup")}>
              Sign Up {links.signup && <div className="lineUnder"></div>}
            </a>
          )}
        </nav>

        {/* Search and Icons */}
        <div className="navbar-right">
          <div className="input-div">
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              className="navbar-search"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <img src="src/assets/search.png" alt="search" onClick={handleSearch} />
          </div>

          {/* Favorite and Cart Icons */}
          <MdFavoriteBorder className="fav-logo" />
          <MdOutlineShoppingCart className="cart-logo" />

          {/* Afficher les icônes de profil et déconnexion uniquement si l'utilisateur est connecté */}
          {isLoggedIn && (
            <>
              <MdAccountCircle className="profile-logo" onClick={goToAccountPage} title="Mon Compte" />
              <MdLogout className="logout-icon" onClick={handleLogout} title="Déconnexion" />
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header;