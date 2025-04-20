import React from "react";
import "./Login.css";
import CardImage from "../components/ui/cardimage";
import FormContainer from "../components/ui/FormContainer";

import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer'

export default function Login() {
  return (
    <>
      
      <div className="container slide-page-right">
        <div className="card">
          <CardImage />
          <FormContainer
            title="Welcome Back"
            subtitle="Please log in to your account"
            showNameInput={false}
            buttonText="Log In"
            linkText="Don't have an account?"
            linkUrl="/signup"
            linkLabel="Sign up"
          />
        </div>
      </div>
     

     
    </>
  );
}
