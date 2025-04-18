import React from "react";
import "./Signup.css";
import CardImage from "../components/ui/cardimage";
import FormContainer from "../components/ui/FormContainer";
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer'

export default function Signup() {
  return (
    <>

<div className="container slide-page">
        <div className="card">
          <CardImage />
          <FormContainer
            title="Create an account"
            subtitle="Enter your details below"
            showNameInput={true}
            buttonText="Sign up"
            linkText="Already have an account?"
            linkUrl="/login"
            linkLabel="Log in"
          />
        </div>
      </div>


    
    </>
  );
}
