import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "../public/logo.png";

const Nav = () => {
  const [searchPath, setSearchPath] = useState("");

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
          <a
            href={"https://www.itemsplanet.com/search/" + searchPath}
            className="searchbutton"
          >
            <i className="fas fa-search"></i>
          </a>
          <input
            id="searchbar"
            placeholder="Search..."
            value={searchPath}
            onChange={(e) => {
              updateSearchPath(e.target.value);
            }}
          />
        </div>

        <div className="saved_button pc-nav">
          <div className="nav_button">
            <Link href="/saved">
              <a>
                <i className="fas fa-star"></i>
              </a>
            </Link>
          </div>
        </div>

        <div className="authbuttons pc-nav">
          <Link href="/signin"><a  className="authbutton signin">
            Login
          </a></Link>
          <Link href="/signup"><a className="authbutton signup">
            Sign Up
          </a></Link>
        </div>
      </div>

      <div
        className="mobile-nav mobile-collapse-nav"
        id="mobile-collapse-nav"
        style={{ display: "none" }}
      >
        <div className="mobile-main-links">
          <Link href="/categories"><a>Categories</a></Link>
          <br />
          <Link href="/blogs">
            <a>Blogs</a>
          </Link>
          <br />
          <a href="/saved">Saved</a>
        </div>
        <hr />
        <div className="auth-user-section">
          <a href="/signin" className="signin">
            Login
          </a>
          <a href="/signup" className="signup">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;
