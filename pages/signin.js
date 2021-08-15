//supabase
import { createClient } from "@supabase/supabase-js";

//react components
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

//components
import Nav from "../components/Nav";
import Link from "next/link";
import Head from "next/head";

const SupabaseURL = require("../next.config").env.SUPABASEURL;
const PublicAnonKey = require("../next.config").env.PUBLICANONKEY;

export default function SignIN() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["UID"]);

  const supabase = createClient(SupabaseURL, PublicAnonKey);

  async function signIn() {
    setErrorMessage("");

    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
      return null
    }

    setCookie("UID", session.access_token, { maxAge: 518400 });
    setCookie("RTK", session.refresh_token, { maxAge: 518400 });
    setCookie("ID", session.user.id, { maxAge: 518400 });

    if (keepSignedIn == true) {
      setCookie("EXP", true, { maxAge: 518400 });//we will give em 6 days
    } else {
      setCookie("EXP", true, { maxAge: 10800 }); // yehhh we will give the users like 3 hours untill it expires. Read somewhere that on session end on ios means that it will expire when the user goes to another tab. We dont want that huh naah
    }
    router.push("/");//back to the home page boi
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
          {errorMessage != "" ? (
            <div className="auth-message">
              <p>{errorMessage}</p>
            </div>
          ) : (
            ""
          )}
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