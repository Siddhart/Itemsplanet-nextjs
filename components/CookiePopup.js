import Link from 'next/link';

const CookiePopup = ({ cookieFunction }) => {
  return (
    <>
      <div className="cookiePopup">
        <div className="cookie-content">
          <div className="cookie-text">
            <p>
              By using this website, you agree to our use of cookies. We use
              cookies to provide you with a great experience and to help our
              website run effectively. Read our <Link href='/policies/cookie_policy'><a>Cookie Policy</a></Link> for more info.
            </p>
          </div>
          <div className="cookie-close-button">
            <button onClick={cookieFunction}>
              <p>
                accept
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePopup;
