import React from 'react';
import { Link } from 'react-router-dom';
import "./About.css";
import photo2 from '../assets/m.png';
import emma from '../assets/emma.png';
import will from '../assets/will.png';
import tom from '../assets/tom.png';
import m1 from '../assets/m1.png';
import c from '../assets/c.png';
import u from '../assets/u.png';
import t1 from '../assets/t1.png';
import m10 from '../assets/m10.png';
import m2 from '../assets/m2.png';
import m4 from '../assets/m4.png';
import m5 from '../assets/m5.png';
import m6 from '../assets/m6.png';
import m7 from '../assets/m7.png';
import logo_v2 from '../assets/logo_v2.webp';
export default function About() {
    return (
        <div className="container">

            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo_v2} alt="SKILL MARKET Logo" className="nav-logo" />
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/about" className="nav-link active">About</Link>
                    <Link to="/about" className="nav-link ">Sign Up</Link>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="What are you looking for?" />
                </div>
                <div className="nav-icons">
                    <button className="icon-button">
                        <img src={c} className="about-image" />
                    </button>
                    <button className="icon-button">
                        <img src={m1} />
                    </button>
                    <button className="icon-button">
                        <img src={u} />
                    </button>
                </div>
            </nav>


            <div className="breadcrumb">
                <span style={{ color: '#aaa' }}>Home</span> / <span className="active">About</span>
            </div>

            <div className="about-section" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>

                <div className="text" style={{ flex: 1, textAlign: 'left' }}>
                    <h1 className="title">Our Story</h1>
                    <p>
                        Launched in 2015, Exclusive is South Asia’s premier online shopping
                        marketplace with an active presence in Bangladesh. Supported by a
                        wide range of tailored marketing, data and service solutions,
                        Exclusive has 10,500 sellers and 300 brands and serves 3 million
                        customers across the region.
                    </p>
                    <p>
                        Exclusive has more than 1 Million products to offer, growing at a
                        very fast. Exclusive offers a diverse assortment in categories
                        ranging from consumer.
                    </p>
                </div>


                <div className="image" style={{ flexShrink: 0 }}>
                    <img
                        src={photo2}
                        alt="Shopping Girls"
                        className="about-image"
                        style={{ width: '350px', height: 'auto', borderRadius: '8px' }}
                    />
                </div>
            </div>

            <div className="statistics">
                <div className="stat">
                    <img src={t1} alt="Sales" className="sm-stat-icon" />
                    <h2>10.5k</h2>
                    <p>Sellers active in our site</p>
                </div>
                <div className="stat highlight">
                    <img src={m10} alt="Sales" className="sm-stat-icon" />
                    <h2>33k</h2>
                    <p>Monthly Product Sale</p>
                </div>
                <div className="stat">
                    <img src={m2} alt="Sales" className="sm-stat-icon" />
                    <h2>45.5k</h2>
                    <p>Customer active in our site</p>
                </div>
                <div className="stat">
                    <img src={m4} alt="Sales" className="sm-stat-icon" />
                    <h2>25k</h2>
                    <p>Annual gross sale in our site</p>
                </div>
            </div>


            <div className="team">
                <div className="team-member">
                    <img src={tom} alt="Tom Cruise" className="about-image" />
                    <h3>Tom Cruise</h3>
                    <p>Founder & Chairman</p>
                </div>
                <div className="team-member">
                    <img src={emma} alt="Emma Watson" className="about-image" />
                    <h3>Emma Watson</h3>
                    <p>Managing Director</p>
                </div>
                <div className="team-member">
                    <img src={will} alt="Will Smith" className="about-image" />
                    <h3>Will Smith</h3>
                    <p>Product Designer</p>
                </div>
            </div>
            <div className="carousel-indicators">
                <span className="indicator "></span>
                <span className="indicator"></span>
                <span className="indicator active"></span>
                <span className="indicator"></span>
                <span className="indicator"></span>
            </div>

            <div className="features" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginTop: '40px' }}>
                <div className="feature">
                    <img src={m5} className="about-image" />
                    <h3>FREE AND FAST DELIVERY</h3>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className="feature">
                    <img src={m6} className="about-image" />
                    <h3>24/7 CUSTOMER SERVICE</h3>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div className="feature">
                    <img src={m7} className="about-image" />
                    <h3>MONEY BACK GUARANTEE</h3>
                    <p>We return money within 30 days</p>
                </div>
            </div>
        </div>
    );
} 