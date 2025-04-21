import React, { useState, useEffect } from 'react';
import Card from './Card';
import Diviser from './Diviser';
import './Best-selling.css';

function BestS() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the 4 most recent products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          // Sort products by createdAt in descending order and take the last 4
          const sortedProducts = result.data.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setProducts(sortedProducts.slice(0, 4)); // Take the first 4 after sorting
        } else {
          throw new Error(result.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="sales-container">
      {/* Divider Component */}
      <div className="top-best-product-container">
        <Diviser name="This Month" title="Best Selling Products" />
        <button className="view-all-button">View All</button>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => (
            <Card 
              key={product._id} // Use MongoDB _id as the unique key
              img={product.image?.[0] || 'https://via.placeholder.com/150'} // Use the first image or a placeholder
              name={product.name}
              price={product.salePrice || product.price} // Use salePrice if available
              rating={product.rating || 0}
              star={product.rating || 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BestS;