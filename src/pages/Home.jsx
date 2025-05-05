import React from 'react'
import { Link } from 'react-router-dom'
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

            <Hero />
            <Sales />
            <BestS />
            <ImgDev />
            <AllProductsSection />
            <New />


        </div>



    )
}

export default Home