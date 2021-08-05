//react components
import Head from "next/head";
import { useState, useEffect } from "react";

//components
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function SignIN() {

    
  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div classNameName="container">
        <Nav classNameName="nav-container" />

        <div className="auth">
            <p className="auth-title">SIGN IN</p>
            <div className="inputfields">
                <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input placeholder="Email" />
                </div>
                <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input placeholder="Password" />
                </div>
            </div>
            <div className="auth-message">
                <p>Please enter a correct email.</p>
            </div>
            <div className="auth-action-button">
                <button>SIGN IN</button>
            </div>
            <div className="already-have-account">
                <p>Not A Member Yet? <a href="/">Sign Up Now</a></p>
            </div>
        </div>   
      </div>
    </>
  );
}
