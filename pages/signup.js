//firebase
import firebase from "../public/firebase/Firebase";

//react components
import Head from "next/head";
import { useState, useEffect } from "react";

//components
import Nav from "../components/Nav";

import Link from "next/link";

export default function SignIN({ firebaseFunction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [acceptedTerms, setAccepted] = useState(false);

  const [errorMessage, setErrormessage] = useState("");

  const [successMessage, setSuccessMessage] = useState(false)

  function checkCredentials() {
    // firebaseFunction.createUser();
    setSuccessMessage(false)
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail) == null) {
      setErrormessage("Please enter a valid e-mail adress");
      return null;
    }

    if (password.split("").length < 8) {
      setErrormessage(
        "Please enter a password that is at least 8 characters long"
      );
      return null;
    }

    if (password != repeatPassword) {
      setErrormessage(
        "The repeated password does not match the original password"
      );
      return null;
    }

    if (!acceptedTerms) {
      setErrormessage("You have to accept the terms and policies to continue");
      return null;
    }

    setErrormessage("");
    createAccount(email, password);
  }

  function createAccount(e, p) {
    console.log(e, p);
    firebase
      .auth()
      .createUserWithEmailAndPassword(e, p)
      .then((userCredential) => {
        var user = userCredential.user;
        user.sendEmailVerification()
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          errorMessage("");
        }
      });

    setSuccessMessage(true)


    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setAccepted(false);
  }

  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <Nav className="nav-container" />

        <div className="auth">
          <p className="auth-title">SIGN UP</p>
          {successMessage ? <div className="sucessMessage">
            <p>
              Registration successfull. To verify your account click on the link
              in your e-mail.
            </p>
          </div> : ''}
          <div className="inputfields">
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                placeholder="Repeat Password"
                type="password"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="checkboxes">
            <div className="accept">
              <input
                type="checkbox"
                id="poterms-and-policies"
                name="poterms-and-policies"
                onChange={(e) => {
                  setAccepted(e.target.checked);
                }}
              />
              <label>
                Accept the{" "}
                <Link href="/">
                  <a>terms and policies</a>
                </Link>
                .
              </label>
            </div>
          </div>
          <div className="auth-message">
            {errorMessage != "" ? <p>{errorMessage}</p> : ""}
          </div>
          <div className="auth-action-button">
            <button onClick={checkCredentials}>SIGN UP</button>
          </div>
          <div className="already-have-account">
            <p>
              Already A Member?{" "}
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
