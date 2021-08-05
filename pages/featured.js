//react components
import Head from "next/head";
import { useState, useEffect } from "react";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Featured() {
  const [featuredItems, setFeaturedItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if(chunk == 'none') return

    fetch(`./dataChunks/featured/${chunk}.json`).then(res => res.json()).then(data =>{
      setChunk(data[data.length - 1].nextChunk)
      data.splice(-1,1)
      data.slice(0, 6)
      setFeaturedItems(featuredItems.concat(data))
    })
  }

  useEffect(() => {
      loadChunk();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <p>Featured Items</p>
        </div>
        <div className="item-grid">
          {featuredItems.map((featureditem) => (
            <Card
              key={Math.floor(Math.random() * 10000)}
              cardClass={featureditem.node.cardClass}
              itemData={featureditem.node}
            />
          ))}
        </div>

        {chunk != 'none' ? <div className="loadMore-button">
          <button onClick={loadChunk}>Load More</button>
        </div> : ''}

        <Footer />
      </div>
    </>
  );
}
