// Card.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import StarEx from './starEx';
import { MdFavoriteBorder } from "react-icons/md";

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');

    if (!token) {
      // 🎨 Fake add for animation/presence only
      setIsAdded(true);
      return;
    }

    // ✅ Real cart addition
    fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: props.id, quantity: 1 }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      return response.json();
    })
    .catch(err => {
      console.error('Error:', err.message);
      alert(`Could not add to cart: ${err.message}`);
      setIsAdded(false); // Revert on failure
    });
  };

  return (
    <Link to={`/products/${props.id}`} className="card-link">
      <div className="card-container">
        <div className="img-wrapper">
          <img src={props.img} alt={props.name} className="product-img" />
          <MdFavoriteBorder
            className={`favorit ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          />
          <button
            className={`add-to-cart ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdded && !localStorage.getItem('token')}
          >
            {isAdded ? "✓ In Cart" : 'Add To Cart'}
          </button>
        </div>
        <div className="product-description">
          <p className="product-name">{props.name}</p>
          <div className="price-rating">
            <p className="price-card">${props.price}</p>
            <div className="star-container">
              <StarEx rating={props.star} />
              <p>({props.rating})</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;