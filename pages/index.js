//react components
import { useState, useEffect } from "react";

//next components
import Head from "next/head";
import Link from "next/link";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home({ saveToUser }) {
  const [featuredItems, setFeaturedItems] = useState([]);

  const [mainItems, setMainItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if(chunk == 'none') return

    fetch(`./dataChunks/mainpage/${chunk}.json`).then(res => res.json()).then(data =>{
      setChunk(data[data.length - 1].nextChunk)
      data.splice(-1,1)
      data.slice(0, 6)
      setMainItems(mainItems.concat(data))
    })
  }

  function getFeaturedItems(){
    fetch(`https://raw.githubusercontent.com/Siddhart/Itemsplanet-nextjs/main/public/dataChunks/featured/0.json`).then(res => res.json()).then(data =>{
      data.splice(-1,1)
      setFeaturedItems(featuredItems.concat(data))
    })
  }

  useEffect(() => {
      loadChunk();
      getFeaturedItems()
  }, []);

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
          <p>FEATURED ITEMS</p>
          <Link href="/featured"><a>MORE</a></Link>
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
          <p>New Discoveries</p>
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

        {chunk != 'none' ? <div className="loadMore-button">
          <button onClick={loadChunk}>Load More</button>
        </div> : ''}

        <Footer />
      </div>
    </>
  );
}