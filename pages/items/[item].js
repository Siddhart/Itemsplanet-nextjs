//react components
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

//next components
import Link from "next/link";
import Head from "next/head";

//components
import Nav from "/components/Nav";
import Footer from "/components/Footer";
import SmallImage from "/components/SmallImage";

//graphql
import { request } from "graphql-request";

const ItemPage = ({ itemPropData, PageURL }) => {
  const [itemData, setItemData] = useState(itemPropData);
  const [images, setImages] = useState(itemPropData.images);
  const [image, setImage] = useState(itemPropData.images[0].url);

  function changeMainImage(imgURL) {
    setImage(imgURL);
  }

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
        <div className="item-content">
          <div className="left-side">
            <div className="item-images">
              <div className="item-main-image">
                <img id="mainImage" src={image} alt="Main Image" />
              </div>
              <div className="item-extra-images">
                <div className="extra-image">
                  {images.map((img, index) => {
                    return (
                      <SmallImage
                        key={index}
                        image={img.url}
                        imageAlt={img.handle}
                        changeMainImage={changeMainImage}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="item-text-content">
              <div className="item-page-upper-part">
                <h1>{itemData.title}</h1>
              </div>
              <div className="item-page-description">
                <p className="desc-title">DESCRIPTION:</p>
                <div className="desc-content">
                  {ReactHtmlParser(itemData.longDescription.html)}
                </div>
              </div>
              <div className="checkout">
                <a
                  href={itemData.affiliateUrl}
                  target="_blank"
                  className="goto-button"
                  rel="noreferrer"
                >
                  VIEW PRODUCT
                </a>
              </div>

              <div className="socials">
                <Link
                  href={`http://pinterest.com/pin/create/button/?url=${PageURL}`}
                >
                  <a className="pinterest" target="_blank" rel="noreferrer">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </Link>
                <Link href={`https://twitter.com/intent/tweet?url=${PageURL}`}>
                  <a className="twitter" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${PageURL}`}
                >
                  <a className="facebook" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getItemData(itemName) {
  const cmsURL = process.env.GRAPHCMS;
  const ITEMQUERY = `
  query MyQuery {
    itemConnection(where: {title: "${itemName.replace(/_/g, " ")}"}) {
      edges {
        node {
          title
          images(first: 100) {
            url
            handle
          }
          featured
          updatedAt
          longDescription {
            html
          }
          affiliateUrl
        }
      }
    }
  }
  `;

  let res = await request(cmsURL, ITEMQUERY);

  return {
    itemName,
    ...res.itemConnection.edges[0].node,
  };
}

export async function getStaticProps({ params }) {
  const itemPropData = await getItemData(params.item);
  return {
    props: {
      itemPropData,
    },
  };
}

export async function getStaticPaths() {
  const cmsURL = process.env.GRAPHCMS;
  const QUERY = `query MyQuery {
    itemConnection(first: 1000) {
      edges {
        node {
          title
        }
      }
    }
  }
  `;

  const res = await request(cmsURL, QUERY);
  const paths = res.itemConnection.edges.map((item) => {
    return {
      params: {
        item: item.node.title.replace(/ /g, "_"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default ItemPage;