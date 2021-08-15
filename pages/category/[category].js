//react components
import { useState, useEffect } from "react";

//next components
import Head from "next/head";

//components
import Nav from "../../components/Nav";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

//grahql
import { request } from "graphql-request";

export default function Category({ catName, saveToUser }) {
  const [cName, setCName] = useState(catName)
  const [categoryItems, setCategoryItems] = useState([]);
  const [chunk, setChunk] = useState(0);

  //load the next chunk
  function loadChunk() {
    if(chunk == 'none') return

    fetch(`./dataChunks/categories/${cName.replace(/ /g, "_")}${chunk}.json`).then(res => res.json()).then(data =>{
      setChunk(data[data.length - 1].nextChunk)
      data.splice(-1,1)
      setCategoryItems(categoryItems.concat(data))
    })
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
        <Nav className="nav-container"/>

        <div className="grid-title">
          <p>{cName.replace(/_/g, " ")}</p>
        </div>
        <div className="item-grid">
          {categoryItems.map((categoryItem) => (
            <Card
              key={categoryItem.node.id}
              cardClass={categoryItem.node.cardClass}
              itemData={categoryItem.node}
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

export async function getStaticProps({ params }) {
  let catName = params.category
  return {
    props: {
      catName,
    },
  };
}

export async function getStaticPaths() {
  const cmsURL = "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
  const QUERY = `query MyQuery {
    categoriesConnection(first: 2500) {
      edges {
        node {
          category
        }
      }
    }
  }
  
  `;

  const res = await request(cmsURL, QUERY);
  const paths = res.categoriesConnection.edges.map((cat) => {
    return {
      params: {
        category: cat.node.category.replace(/ /g, "_"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}