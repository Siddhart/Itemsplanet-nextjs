//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co";
const PublicAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE";

//react components
import { useState, useEffect } from "react";

//next components
import { useRouter } from "next/router";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

//graphql
import { request } from "graphql-request";

//SEO
import SEO from "../components/SEO";

export default function Search({ saveToUser, q }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchAmount, setSearchAmount] = useState(0);

  const supabase = createClient(SupabaseURL, PublicAnonKey);
  const router = useRouter();

  useEffect(() => {
    async function searchFunction() {
      setSearchedItems([]);
      setSearchQuery(q.trim());

      if (searchQuery.length < 3) {
        setSearchAmount(0)
        setSearchedItems([]);
        return null;
      }

      if (searchQuery) {
        const { data, error } = await supabase.from("search").select(`*`).ilike('title', `%${searchQuery}%`);

        if(error){
          router.push('/')
          return null
        }
        setSearchedItems([].concat(data));
        setSearchAmount(data.length);
      }
    }
    searchFunction();
  }, [searchQuery, router]);

  return (
    <>
      <SEO
        seoTitle={
          "Itemsplanet - " +
          searchAmount +
          " Results For " +
          searchQuery.toUpperCase()
        }
        seoDescription="Browse or search for cool items on our website. We have listed a lot of cool and cheap items."
        seoUrl={'https:"//www.itemsplanet.com/search?q=' + searchQuery}
      />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

        <div className="grid-title">
          {searchQuery.length >= 3 ? (
            <p>
              {searchAmount} RESULT{searchAmount <= 1 ? "" : "S"} FOR{" "}
              {searchQuery.toUpperCase()}
            </p>
          ) : (
            <p>PLEASE ENTER AT LEAST 3 CHARACTERS</p>
          )}
        </div>
        {searchQuery.length >= 3 ? (
          <div className="item-grid">
            {searchedItems.map((item) => (
              <Card
                key={item.id}
                itemData={item}
                saveToUser={saveToUser}
              />
            ))}
          </div>
        ) : (
          ""
        )}

        {searchQuery.length >= 3 ? <Footer /> : ""}
      </div>
    </>
  );
}

Search.getInitialProps = async ({ query }) => {
  const { q } = query;
  return { q };
};
