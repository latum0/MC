// Card.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Card.css';
import StarEx from './starEx';
import { MdFavoriteBorder } from "react-icons/md";

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  // Check if product is already in cart
  useEffect(() => {
    const checkCartStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        .then(cart => {
          const isInCart = cart?.items?.some(item => item.product._id === props.id);
          setIsAdded(isInCart);
        })
        .catch(err => console.error('Error checking cart status:', err));
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setIsAdded(guestCart.some(item => item.productId === props.id));
      }
    };
    checkCartStatus();
  }, [props.id]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');

    try {
      if (token) {
        // Authenticated user
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: props.id }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to add to cart');

        setIsAdded(true);

      } else {
        // Guest user
        let guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const existingItemIndex = guestCart.findIndex(item => item.productId === props.id);

        if (existingItemIndex > -1) {
          guestCart[existingItemIndex].quantity += 1;
        } else {
          guestCart.push({ productId: props.id, quantity: 1 });
        }

        localStorage.setItem('guestCart', JSON.stringify(guestCart));
        setIsAdded(true);
      }
    } catch (err) {
      console.error('Add to cart error:', err.message);
      alert(`Error: ${err.message}`);
    }
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
            disabled={isAdded}
          >
            {isAdded ? "✓ In Cart" : "Add To Cart"}
          </button>
        </div>
        <div className="product-description">
          <div className="product-text">
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
      </div>
    </Link>
  );
};

export default Card;