import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import StarEx from './starEx';
import { MdFavoriteBorder } from "react-icons/md";

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  // Check cart status on component mount and product ID change
  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart');
        if (!response.ok) return;
        
        const cart = await response.json();
        const isInCart = cart?.items?.some(item => 
          item.product._id === props.id
        );
        setIsAdded(isInCart);
      } catch (err) {
        console.error('Error checking cart status:', err);
      }
    };

    checkCartStatus();
  }, [props.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: props.id,
          quantity: 1
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add to cart');
      }

      // Update local state after successful addition
      setIsAdded(true);

    } catch (err) {
      console.error('Add to cart error:', err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${props.id}`);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="img-wrapper">
        {/* Use the img prop for the image source */}
        <img 
          src={props.img} 
          alt={props.name} 
          className="product-img" 
        />
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
          {isAdded ? "✓ In Cart" : 'Add To Cart'}
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
  );
}

export default Card;
