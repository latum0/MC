import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { MdFavoriteBorder } from "react-icons/md";
import Diviser from '../components/ui/Diviser';
import Card from '../components/ui/Card';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Add cart state
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkCartStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          if (!response.ok) return;
          return response.json();
        })
        .then(cart => {
          const isInCart = cart?.items?.some(item => item.product._id === id);
          setIsAdded(isInCart);
        });
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setIsAdded(guestCart.some(item => item.productId === id));
      }
    };

    const fetchData = async () => {
      try {
        // Fetch main product
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!productResponse.ok) throw new Error('Product not found');
        const productData = await productResponse.json();
        setProduct(productData.data);
        checkCartStatus();

        // Fetch related products
        const relatedResponse = await fetch(
          `http://localhost:5000/api/products?category=${productData.data.category}&limit=5`
        );
        const relatedData = await relatedResponse.json();
        
        const filteredRelated = relatedData.data
          .filter(item => item._id !== productData.data._id)
          .slice(0, 4);
        
        setRelatedProducts(filteredRelated);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    
    try {
      if (token) {
        // Authenticated user
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: id,
            quantity: quantity
          })
        });

        if (!response.ok) throw new Error('Failed to add to cart');
        setIsAdded(true);
        alert(`${quantity} item(s) added to cart!`);
      } else {
        // Guest user
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const existingItem = guestCart.find(item => item.productId === id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          guestCart.push({
            productId: id,
            quantity: quantity,
            product: {
              name: product.name,
              price: product.price,
              image: product.image
            }
          });
        }
        
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        setIsAdded(true);
        alert(`${quantity} item(s) added to cart!`);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-container">
      <div className="product-main">
        {/* Image Section */}
        <div className="image-section">
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
          />
        </div>

        {/* Product Info Section */}
        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          
          <div className="price-section">
            {product.salePrice ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="sale-price">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <div className="action-buttons">
            <button 
              className={`add-to-cart-page ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "✓ Added to Cart" : 'Add to Cart'}
            </button>
            <button className="buy-now">
              Buy Now
            </button>
          </div>

          <button 
            className={`wishlist-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <MdFavoriteBorder />
            {isLiked ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      <Diviser name="Related Products"/>
      <div className="related-products">
        {relatedProducts.map(relatedProduct => (
          <Card
            key={relatedProduct._id}
            id={relatedProduct._id}
            name={relatedProduct.name}
            price={relatedProduct.price}
            img={relatedProduct.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;