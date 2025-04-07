import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import StarEx from './starEx';
import { MdFavoriteBorder } from "react-icons/md";

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setIsAdded(!isAdded);
  };

  const handleCardClick = () => {
    
    navigate(`/products/${props.id}`);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="img-wrapper">
        <img src={props.img} alt={props.name} className="product-img" />
        <MdFavoriteBorder 
          className={`favorit ${isLiked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        />
        <button className="add-to-cart" onClick={handleAdd}>
          { isAdded ? "✓" : 'Add To Cart'}
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
