import React from "react";
import "./FormContainer.css";
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function FormContainer({
  title,
  subtitle,
  showNameInput,
  buttonText,
  linkText,
  linkUrl,
  linkLabel,
}) {
  return (
    <div className="form-section animate-right">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <form>
        {showNameInput && <input type="text" placeholder="Name" />}
        <input type="email" placeholder="Email or Phone Number" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="create-btn">{buttonText}</button>
        <p className="forgot-password-link">
        <Link to="/reset-password">Forgot Password?</Link>
      </p>
      </form>
      <div className="divider">or</div>
      <button className="google-btn">
        <FaGoogle className="google-icon" />
        Sign up with Google
      </button>

      <p className="login-link">
        {linkText} <Link to={linkUrl}>{linkLabel}</Link>
      </p>
      
    </div>
  );
}
