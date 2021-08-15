import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Image from "next/image";

import "../public/logo.png";

const Nav = () => {
  const [searchPath, setSearchPath] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "ID",
    "RTK",
    "AUTH",
    "EXP",
  ]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkCookieAuth() {
      if (cookies.ID && cookies.ID != "") {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }
    checkCookieAuth();
  }, [cookies]);

  //update search path
  function updateSearchPath(e) {
    setSearchPath(e);
  }

  //toggle mobile navbar
  function mobileNavToggle() {
    var x = document.getElementById("mobile-collapse-nav");
    if (x.style.display === "none" || !x.style.display) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function logout() {
    setCookie("RTK", "");
    setCookie("SL", "");
    setCookie("ID", "");
    setCookie("EXP", false);
  }

  return (
    <div>
      <div className="nav-pc-container">
        <div className="nav-logo">
          <Link href="/">
            <a>
              <img src="https://www.itemsplanet.com/logo.png" alt="logo" />
            </a>
          </Link>
        </div>

        <div className="cat_blog">
          <a onClick={mobileNavToggle} className="mobile-nav">
            <div className="nav_button">
              <i className="fas fa-bars"></i>
            </div>
          </a>
          <div className="nav_button pc-nav">
            <Link href="/categories">
              <a>
                <i className="fas fa-th-large"></i>
              </a>
            </Link>
          </div>
          <div className="nav_button pc-nav">
            <Link href="/blogs">
              <a>
                <i className="fas fa-book"></i>
              </a>
            </Link>
          </div>
        </div>

        <div className="searchbar">
          <Link href={"/search?q=" + searchPath}>
            <a className="searchbutton">
              <i className="fas fa-search"></i>
            </a>
          </Link>
          <input
            id="searchbar"
            placeholder="Search..."
            value={searchPath}
            onChange={(e) => {
              updateSearchPath(e.target.value);
            }}
          />
        </div>

        {authenticated == true ? (
          <div className="saved_button pc-nav">
            <div className="nav_button">
              <Link href="/saved">
                <a>
                  <i className="fas fa-star"></i>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="authbuttons pc-nav" style={{ marginLeft: "10px" }}>
          {authenticated == false ? (
            <>
              <Link href="/signin">
                <a className="authbutton signin">Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="authbutton signup">Sign Up</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <a onClick={logout} className="authbutton signin logout">
                  Logout
                </a>
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className="mobile-nav mobile-collapse-nav"
        id="mobile-collapse-nav"
        style={{ display: "none" }}
      >
        <div className="mobile-main-links">
          <Link href="/categories">
            <a>Categories</a>
          </Link>
          <br />
          <Link href="/blogs">
            <a>Blogs</a>
          </Link>
          <br />
          <Link href="/saved">
            <a>Saved</a>
          </Link>
        </div>
        <hr />
        <div className="auth-user-section">
          {!authenticated ? (
            <>
              <Link href="/signin">
                <a className="signin">Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="signup">Sign Up</a>
              </Link>
            </>
          ) : (
            <Link href="/">
              <a onClick={logout} className="signin">
                Logout
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;