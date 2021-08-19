//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co";
const PublicAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE";

//react components
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//next components
import Head from "next/head";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

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
      } else {
        setSavedItems([]);
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
          <div
            style={{
              margin: "auto",
              width: "75%",
              marginTop: "75px",
              textAlign: "center",
            }}
          >
            <p>
              You have no saved items. To save an item click on the heart icon
              when hovering over a item card.
            </p>
          </div>
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

        {savedItems.length != 0 ? (
          <>
            <Footer />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
