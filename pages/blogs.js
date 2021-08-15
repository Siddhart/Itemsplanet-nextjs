//react components
import { useState, useEffect } from "react";

//next components
import Head from "next/head";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Blogs({ saveToUser }) {
  const [blogItems, setBlogItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if (chunk == "none") return;

    fetch(`https://raw.githubusercontent.com/Siddhart/Itemsplanet-nextjs/main/public/dataChunks/blogs/${chunk}.json`)
      .then((res) => res.json())
      .then((data) => {
        setChunk(data[data.length - 1].nextChunk);
        data.splice(-1, 1);
        data.slice(0, 6);
        setBlogItems(blogItems.concat(data));
      });
  }

  useEffect(() => {
    loadChunk();
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
        <Nav className="nav-container" />

        <div className="grid-title">
          <p>All BLOGS</p>
        </div>
        <div className="item-grid">
          {blogItems.map((blogItem) => (
            <Card
              key={blogItem.node.id}
              cardClass={blogItem.node.cardClass}
              itemData={blogItem.node}
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