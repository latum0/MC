import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenue chez SKILL MARKET</h1>
            <nav className="home-nav">
                <Link to="/about" className="nav-btn">À propos</Link>
                <Link to="/contact" className="nav-btn">Contact</Link>
                <Link to="/Found" className="nav-btn">Found</Link>
            </nav>
        </div>
    )
}

export default Home