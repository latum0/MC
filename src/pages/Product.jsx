import React, { useState } from 'react';
import './Product.css';
import Card from '../components/ui/Card'
import AllProducts from '../assets/AllProducts'
import GraphicImg from '../assets/graphic.webp'
import Diviser from '../components/ui/Diviser'



const Product = () => {
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [zipCode, setZipCode] = useState('');

 

  return (
    <div className="product-container">
      <nav className="breadcrumbs">
        <span className="crumb">Account</span> / 
        <span className="crumb"> Gaming</span> / 
        <span className="active-crumb"> Havic HV G-92 Gamepad</span>
      </nav>

      <div className="product-main">
        <div className="product-image">
            <img src={GraphicImg} alt="" />
        </div>

        <div className="product-details">
          <h1 className="product-title">HAVIC HV G-92 Gamepad</h1>
          <div className="rating-stock">
            <div className="stars">
              {'★★★★★'.split('').map((_, i) => <span key={i}>★</span>)}
            </div>
            <span className="reviews">(150 Reviews)</span>
            <span className="stock">In Stock</span>
          </div>

          <p className="price">$192.00</p>
          <p className="description">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive 
            for easy bubble free install & mess free removal Pressure sensitive.
          </p>

          <div className="color-selector">
            <h3>Colours:</h3>
            <div className="color-options">
              {['Red', 'Blue', 'Black'].map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="size-selector">
            <h3>Size:</h3>
            <div className="size-options">
              {['XS', 'S', 'M', 'X'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="buy-btn">Buy Now</button>
          </div>

          
        </div>
      </div>

      <Diviser name="Related Items"/>
      <div className="products-grid">
        {AllProducts.slice(0, 4).map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            star={product.star}
            rating={product.rating}
            img={GraphicImg}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;