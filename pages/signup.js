//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co"
const PublicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE"

//react components
import { useState } from "react";

//next components
import Head from "next/head";
import Link from "next/link";

//components
import Nav from "../components/Nav";


export default function SignIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [acceptedTerms, setAccepted] = useState(false);

  const [errorMessage, setErrormessage] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const supabase = createClient(SupabaseURL, PublicAnonKey);

  function checkCredentials() {
    // firebaseFunction.createUser();
    setSuccessMessage(false);
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

  async function createAccount(e, p) {
    await supabase.auth.signUp({
      email: e,
      password: p,
    });

    setSuccessMessage(true);

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
        <Nav className="nav-container"/>

        <div className="auth">
          <p className="auth-title">SIGN UP</p>
          {successMessage ? (
            <div className="sucessMessage">
              <p>
                Registration successfull. To verify your account click on the
                link in your e-mail.
              </p>
            </div>
          ) : (
            ""
          )}
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