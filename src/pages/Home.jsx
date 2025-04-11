import React from 'react'
<<<<<<< HEAD
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
=======
import Sales from '../components/ui/Sales';
import Header from '../components/ui/Header';
import Hero from '../components/ui/Hero';
import './Home.css';
import Footer from '../components/ui/Footer'
import BestS from '../components/ui/Best-selling';
import ImgDev from '../components/ui/ImgDev'
import AllProductsSection from '../components/ui/AllProductsSection'
import New from '../components/ui/New';



const Home = () => {
  return (
    
      <div className="home-container">
          
          <Hero/>
          <Sales/>
          <BestS/>
          <ImgDev/>
          <AllProductsSection/>
          <New/>
          
          
          
        
        
      </div>
   
     
    
  )
>>>>>>> db256295e5c4962a0b55daab6f0610d10fda96a6
}

export default Home