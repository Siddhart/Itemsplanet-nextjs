//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co";
const PublicAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE";

//react components
import { useState } from "react";
import { useCookies } from "react-cookie";

//next components
import { useRouter } from "next/router";

//components
import Nav from "../components/Nav";
import Link from "next/link";

//SEO
import SEO from "../components/SEO";

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
      return null;
    }

    setCookie("UID", session.access_token, { maxAge: 518400 });
    setCookie("RTK", session.refresh_token, { maxAge: 518400 });
    setCookie("ID", session.user.id, { maxAge: 518400 });

    if (keepSignedIn == true) {
      setCookie("EXP", true, { maxAge: 518400 });
    } else {
      setCookie("EXP", true, { maxAge: 10800 });
    }
    router.push("/");

    ReactGA.event({
      category: 'User',
      action: 'User Login'
    });
  }

  return (
    <>
      <SEO
        seoTitle="Itemsplanet - Sign In"
        seoDescription="Browse or search for cool items on our website. We have listed a lot of cool and cheap items."
        seoUrl='https:"//www.itemsplanet.com/signin'
      />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

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
