import React, { useState } from 'react';
import Card from './Card';
import Diviser from './Diviser';
import './Best-selling.css'

function BestS() {
  const [saleTime, setSaletime] = useState("03 : 23 : 19 : 56");
  
  const products = [
    {
      id: 1,
      img: "src/assets/graphic.webp",
      name: "HAVIT HV-G92 Gamepad",
      price: "16",
      rating: 70,
      stars: 5,
    },
    {
      id: 1,
      img: "src/assets/graphic.webp",
      name: "HAVIT HV-G92 Gamepad",
      price: "16",
      rating: 70,
      stars: 5,

    },
    {
      id: 1,
      img: "src/assets/graphic.webp",
      name: "HAVIT HV-G92 Gamepad",
      price: "16",
      rating: 70,
      stars: 5,
    },
    {
      id: 1,
      img: "src/assets/graphic.webp",
      name: "HAVIT HV-G92 Gamepad",
      price: "16",
      rating: 70,
      stars: 5,

    },
    
  ];

  return (
    <div className="sales-container">
        <div className="top-best-product-container">
            <Diviser name="This Month" title="Best Selling Products" />
            <button className="view-all-button" >View All</button>
        </div>
      

      <div className="sales-text">
        
      </div>
      <div className="products-grid">
        {products.map(product => (
          <Card 
            key={product.id}
            img={product.img}
            name={product.name}
            price={product.price}
            rating={product.rating}
            star={product.stars}
          />
        ))}
      </div>
      
    </div>
  );
}

export default BestS;