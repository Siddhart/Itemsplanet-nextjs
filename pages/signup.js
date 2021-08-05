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
      <div classNameNameName="container">
        <Nav classNameNameName="nav-container" />

        <div className="auth">
            <p className="auth-title">SIGN UP</p>
            <div className="inputfields">
                <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input placeholder="Email" />
                </div>
                <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input placeholder="Password" />
                </div>
                <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input placeholder="Repeat Password" />
                </div>
            </div>
            <div className="checkboxes">
                <input type="checkbox" id="poterms-and-policies" name="poterms-and-policies" />
                <label for="terms-and-policies">Accept the <a href="/">terms and policies</a>.</label>
                <br />
                <input type="checkbox" id="updated" name="poupdatedicy" />
                <label for="updated">Keep me updated with new items.</label>
            </div>
            <div className="auth-message">
                <p>Please enter a correct email.</p>
            </div>
            <div className="auth-action-button">
                <button>SIGN UP</button>
            </div>
            <div className="already-have-account">
                <p>Already A Member? <a href="/">Sign In</a></p>
            </div>
        </div>
      </div>
    </>
  );
}
