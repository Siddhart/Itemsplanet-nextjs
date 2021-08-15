//supabase variables
import { createClient } from "@supabase/supabase-js";
const SupabaseURL = require("../next.config").env.SUPABASEURL;
const PublicAnonKey = require("../next.config").env.PUBLICANONKEY;

//react components
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useCookies } from "react-cookie";

export default function Saved({ saveToUser }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "UID",
    "RTK",
    "AUTH",
    "EXP",
    "ID",
    "SL",
  ]);

  const [savedItems, setSavedItems] = useState([]);

  const supabase = createClient(SupabaseURL, PublicAnonKey);

  useEffect(() => {
    async function getSaved() {
      if (cookies.SL != "") {
        let savedList = cookies.SL;
        savedList = savedList.split(";");

        let savedItemQuery = savedList.map((item) => {
          return item;
        });


        const { data, error } = await supabase
          .from("search")
          .select("id, title, image, cardClass, blog")
          .in("id", savedItemQuery);

        if (error) {
          return null;
        }

        setSavedItems(data);
      }else{
        setSavedItems([])
      }
    }

    getSaved();
  }, [cookies.SL, cookies.ID]);

  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>
        <div className="grid-title">
          <p>SAVED</p>
        </div>
        {savedItems.length <= 0 ? (
            <div style={{margin: "auto", width: "fit-content", marginTop: "75px"}}><p>You have no saved items. To save an item click on the heart icon when hovering over a item card.</p></div>
        ) : (
          ""
        )}
        <div className="item-grid">
          {savedItems.map((item) => (
            <Card
              key={item.id}
              cardClass={item.cardClass}
              itemData={item}
              saveToUser={saveToUser}
            />
          ))}
        </div>

        {/* 
        {chunk != 'none' ? <div className="loadMore-button">
          <button onClick={loadChunk}>Load More</button>
        </div> : ''} */}

        {savedItems.length != 0 ? <><Footer /></> : ""}
      </div>
    </>
  );
}