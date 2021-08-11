//react components
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router'

//firebase
import firebase from "../public/firebase/Firebase";

//css files
import "../styles/main.css";
import "../styles/index.css";
import "../styles/item.css";
import "../styles/blog.css";
import "../styles/categories.css";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies(["UID"]);

  const [UserID, setUserID] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (cookies.UID) {
      setUserID(cookies.UID);
      setAuthenticated(true)
    }else{
      setUserID("");
      setAuthenticated(false)
    }
  }, [cookies]);

  function saveToUser(id) {
    console.log(id);
    if(UserID == ""){
      router.push('/signup')
      return null;
    }
  }

  return (
    <>
      <Component {...pageProps} saveToUser={saveToUser} authenticated={authenticated} />
    </>
  );
}

export default MyApp;
