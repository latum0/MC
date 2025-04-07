import React, { useState } from 'react';
import Card from './Card';
import Diviser from './Diviser';
import './Sales.css'

function Sales() {
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
      <Diviser name="Today's" title="Flash Sales"  />
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
      <div className="all-products">
        <button className="all-products-button">
         View All Products
        </button>

      </div>
    </div>
  );
}

export default Sales;