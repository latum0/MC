import React from 'react';
  import Card from './Card';
  import AllProducts from '../../assets/AllProducts';
  import './AllProductsSection.css';
  import Diviser from './Diviser';
  
  const AllProductsSection = () => {
  return (
  <section className="products-section">
  <div className="diviser-container">
  <Diviser name="Our Products"/>
  </div>
  <div className="section-header">
    <h2>Explore Our Products</h2>
    <button className="view-all-button" >View All</button>
  </div>

  <div className="products-grid">
    {AllProducts.map((product) => (
      <Card
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        star={product.star}
        rating={product.rating}
        img={product.img}
      />
    ))}
  </div>
</section>
);
};

export default AllProductsSection;