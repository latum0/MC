import React from "react";
import "./Card.css";


const Card = () => {
  return (
    <div className="card-container">
      <img src={cartImage} alt="Shopping cart" className="card-image" />
    </div>
  );
};

export default Card;
