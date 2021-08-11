
//firebase
import firebase from "../public/firebase/Firebase";

//react components
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"

//components
import Nav from "../components/Nav";
import Link from "next/link";
import Head from "next/head";

export default function SignIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()

  const [cookies, setCookie, removeCookie] = useCookies(['UID']);

  function signIn() {
    setErrorMessage('')
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user)
        if(!user.emailVerified){
          user.sendEmailVerification()
          setErrorMessage('Please verify your email before you login.')
          return null
        }

        console.log('signed in: ' + keepSignedIn)
        //update the cookies
        if(keepSignedIn == true){
          setCookie('UID', user.uid, {maxAge: 15778463})//6 months
        }else{
          setCookie('UID', user.uid, {maxAge: 3600})//1 hour
        }
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMessage('The email or password is incorrect.')
      });
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
          <p className="auth-title">SIGN IN</p>
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
          </div>
          <div className="checkboxes">
            <div className="accept">
              <input
                type="checkbox"
                id="poterms-and-policies"
                name="poterms-and-policies"
                onChange={(e) => {
                  setKeepSignedIn(e.target.checked);
                }}
              />
              <label>Keep me signed in</label>
            </div>
          </div>
          {errorMessage != '' ? <div className="auth-message">
            <p>{errorMessage}</p>
          </div> : ''}
          <div className="auth-action-button">
            <button onClick={signIn}>SIGN IN</button>
          </div>
          <div className="already-have-account">
            <p>
              Not A Member Yet?{" "}
              <Link href="/signup">
                <a>Sign Up Now</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
