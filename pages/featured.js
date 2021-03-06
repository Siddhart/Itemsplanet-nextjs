//react components
import { useState, useEffect } from "react";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

//SEO
import SEO from '../components/SEO'

export default function Featured({ saveToUser }) {
  const [featuredItems, setFeaturedItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if (chunk == "none") return;

    fetch(`./dataChunks/featured/${chunk}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChunk(data[data.length - 1].nextChunk);
        data.splice(-1, 1);
        data.slice(0, 6);
        setFeaturedItems(featuredItems.concat(data));
      });
  }

  useEffect(() => {
    loadChunk();
  }, []);

  return (
    <>
      <SEO seoTitle="Itemsplanet - Featured" seoDescription="Browse trough all the featured items on Itemsplanet. Find gadgets and trending items" seoUrl='https:"//www.itemsplanet.com/featured' />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

        <div className="grid-title">
          <p>Featured Items</p>
        </div>
        <div className="item-grid">
          {featuredItems.map((featureditem) => (
            <Card
              key={featureditem.node.id}
              cardClass={featureditem.node.cardClass}
              itemData={featureditem.node}
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
