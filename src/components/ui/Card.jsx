// Card.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import StarEx from "./starEx";
import { MdFavoriteBorder } from "react-icons/md";

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    console.log("Clicked Add to Cart, productId:", props.id);
    
    if (!token) {
      setIsAdded(true); // Fake add for animation/presence only when not logged in
      return;
    }

    try {
      // Step 1: Add product to cart
      const cartResponse = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: props.id, quantity: 1 }),
      });

      if (!cartResponse.ok) {
        const errorData = await cartResponse.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      const cartData = await cartResponse.json();
      console.log("Cart response:", cartData);
      setIsAdded(true);
      
      
    } catch (err) {
      console.error("Error:", err.message);
      alert(`Could not complete action: ${err.message}`);
      setIsAdded(false);
    }
  };

  return (
    <Link to={`/products/${props.id}`} className="card-link">
      <div className="card-container">
        <div className="img-wrapper">
          <img src={props.img} alt={props.name} className="product-img" />
          <MdFavoriteBorder
            className={`favorit ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          />
          <button
            className={`add-to-cart ${isAdded ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdded && !localStorage.getItem("token")}
          >
            {isAdded ? "✓ In Cart" : "Add To Cart"}
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
