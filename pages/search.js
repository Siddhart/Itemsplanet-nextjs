//react components
import { useState, useEffect } from "react";

//next components
import Head from "next/head";
import { useRouter } from "next/router";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

//graphql
import { request } from "graphql-request";

export default function Search({ saveToUser, q }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchAmount, setSearchAmount] = useState(0);

  const router = useRouter();

  useEffect(async () => {
    setSearchedItems([]);

    setSearchQuery(q);

    if(searchQuery.length < 3){
      setSearchedItems([]);
      return null
    }

    if (searchQuery) {
      const SEARCHQ = `query MyQuery {
          itemConnection(where: {title_contains: "${searchQuery}"}) {
            edges {
              node {
                id
                title
                images(first: 1) {
                  id
                  url
                }
                featured
              }
            }
          }
        }`;

      let res = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master",
        SEARCHQ
      );
      setSearchedItems([].concat(res.itemConnection.edges));
      setSearchAmount(res.itemConnection.edges.length);
    }
  }, [searchQuery, router]);

  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <Nav className="nav-container" />

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
        {searchQuery.length >= 3 ? <div className="item-grid">
          {searchedItems.map((item) => (
            <Card
              key={item.node.id}
              itemData={item.node}
              saveToUser={saveToUser}
            />
          ))}
        </div> : ""}

        {searchQuery.length >= 3 ? <Footer /> : ""}
      </div>
    </>
  );
}

Search.getInitialProps = async ({ query }) => {
  const { q } = query;
  return { q };
};
