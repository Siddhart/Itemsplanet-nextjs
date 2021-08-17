//react components
import { useState, useEffect } from "react";

//components
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";

//SEO
import SEO from '../components/SEO'

export default function Blogs({ saveToUser }) {
  const [blogItems, setBlogItems] = useState([]);

  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if (chunk == "none") return;

    fetch(`./dataChunks/blogs/${chunk}.json`)
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
      <SEO seoTitle="Itemsplanet - Blogs" seoDescription="Browse trough all our blogs. Find blogs which go more in dept about trending items and gadgets" seoUrl='https:"//www.itemsplanet.com/blogs' />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

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
