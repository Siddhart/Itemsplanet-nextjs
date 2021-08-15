//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = require("../next.config").env.SUPABASEURL;
const PublicAnonKey = require("../next.config").env.PUBLICANONKEY;

//react components
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//next components
import { useRouter } from "next/router";

//css files
import "../styles/cleanup.min.css";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "UID",
    "RTK",
    "AUTH",
    "EXP",
    "ID",
    "SL",
  ]);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  const supabase = createClient(SupabaseURL, PublicAnonKey);

  function resetEverythingBoi(){
    setCookie("UID", "");
    setCookie("RTK", "");
    setCookie("SL", "");
    setCookie("ID", "");
    setCookie("EXP", false);
    setAuthenticated(false);
  }
  
  useEffect(() => {

    async function checkAuth() {
      if (cookies.EXP && cookies.EXP == "true") {
        if (cookies.RTK && cookies.RTK != "") {
          const { user, session, error } = await supabase.auth.signIn({
            refreshToken: cookies.RTK,
          });

          setCookie("UID", session.access_token);
          setCookie("RTK", session.refresh_token);
          setCookie("ID", session.user.id);
        }
      }

      if (cookies.EXP == undefined) {
        resetEverythingBoi()
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function checkCookieAuth() {
      if (cookies.UID && cookies.UID != "") {
        setCookie("AUTH", true);
        setAuthenticated(true);
      } else {
        resetEverythingBoi()
      }

      if (cookies.ID != "") {
        let readResponse = await supabase
          .from("userlists")
          .select("list")
          .eq("user_id", cookies.ID);

        if (!readResponse.data) {
          return null;
        }
        if (readResponse.data.length > 0) {
          setCookie("SL", readResponse.data[0].list);
        } else {
          setCookie("SL", "");
        }
      }
    }

    checkCookieAuth();
  }, [cookies]);

  async function saveToUser(id) {
    if (!authenticated) {
      router.push("/signup");
      return null;
    }

    if(cookies.ID == '' || !cookies.ID){
      return null
    }
    let readResponse = await supabase
      .from("userlists")
      .select("list")
      .eq("user_id", cookies.ID);

    if (readResponse.error) {
      router.push("/signup");
      return null;
    }

    readResponse = readResponse.data;
    let newList;

    if (readResponse.length > 0) {
      let tempList = readResponse[0].list;
      let list = tempList.split(";");

      let isSaved = false;
      for (let x = 0; x < list.length; x++) {
        if (list[x] == id) {
          isSaved = true;
        }
      }

      if (!isSaved) {
        list.push(id.toString());
        newList = list;
      } else {
        newList = list.filter((prop) => prop != id);
      }
      newList = newList.join(";");

      const { data, error } = await supabase
        .from("userlists")
        .update({ list: newList })
        .eq("user_id", cookies.ID);
    } else {
      newList = id;

      const { data, error } = await supabase
        .from("userlists")
        .insert([{ list: newList, user_id: cookies.ID }]);
    }

    let newReadResponse = await supabase
      .from("userlists")
      .select("list")
      .eq("user_id", cookies.ID);

    if (newReadResponse.data.length > 0) {
      setCookie("SL", newReadResponse.data[0].list);
    } else {
      setCookie("SL", "");
    }
  }

  return (
    <>
      <Component {...pageProps} saveToUser={saveToUser} />
    </>
  );
}

export default MyApp;