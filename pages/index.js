//react components
import { useState, useEffect } from "react";

//next components
import Link from "next/link";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

//SEO
import SEO from '../components/SEO'

export default function Home({ saveToUser }) {
  const [featuredItems, setFeaturedItems] = useState([]);

  const [mainItems, setMainItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if (chunk == "none") return;
    fetch(`./dataChunks/mainpage/${chunk}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChunk(data[data.length - 1].nextChunk);
        data.splice(-1, 1);
        data.slice(0, 6);
        setMainItems(mainItems.concat(data));
      });
  }

  function getFeaturedItems() {
    fetch(`./dataChunks/featured/0.json`)
      .then((res) => res.json())
      .then((data) => {
        data.splice(-1, 1);
        setFeaturedItems(featuredItems.concat(data));
      });
  }

  useEffect(() => {
    loadChunk();
    getFeaturedItems();
  }, []);

  return (
    <>
      <SEO seoTitle="Itemsplanet" seoDescription="Browse or search for cool items on our website. We have listed a lot of cool and cheap items." seoUrl='https:"//www.itemsplanet.com' />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>
        <div className="grid-title">
          <p>FEATURED ITEMS</p>
          <Link href="/featured">
            <a>MORE</a>
          </Link>
        </div>
        <div className="item-grid">
          {featuredItems.map((featured) => (
            <Card
              key={featured.node.id}
              cardClass={featured.node.cardClass}
              itemData={featured.node}
              saveToUser={saveToUser}
            />
          ))}
        </div>

        <div className="grid-title">
          <p>NEW DISCOVERIES</p>
        </div>
        <div className="item-grid">
          {mainItems.map((mainItem) => (
            <Card
              key={mainItem.node.id}
              itemData={mainItem.node}
              saveToUser={saveToUser}
            />
          ))}
        </div>

        {chunk != "none" ? (
          <div className="loadMore-button">
            <button onClick={loadChunk}>Load More</button>
          </div>
        ) : (
          ""
        )}

        <Footer />
      </div>
    </>
  );
}
