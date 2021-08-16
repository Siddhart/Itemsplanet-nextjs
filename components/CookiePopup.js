import { useCookies } from "react-cookie";

const CookiePopup = ({ cookieFunction }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "UID",
    "RTK",
    "EXP",
    "ID",
    "SL",
    "CK"
  ]);

  return (
    <>
      <div className="cookiePopup">
        <div className="cookie-text">
          <p>
            By using this website, you agree to our use of cookies. We use
            cookies to provide you with a great experience and to help our
            website run effectively.
          </p>
        </div>
        <div className="cookie-close-button">
          <button onClick={cookieFunction}>
            <p>
              <i className="fas fa-times"></i>
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default CookiePopup;
