//react components
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

//next components
import Link from "next/link";

//components
import Nav from "/components/Nav";
import Footer from "/components/Footer";
import SmallImage from "/components/SmallImage";
import { useCookies } from "react-cookie";

//graphql
import { request } from "graphql-request";

//SEO
import SEO from '../../components/SEO'

//ads component
import Ads from '../../components/Ads'

const ItemPage = ({ itemPropData, PageURL, saveToUser }) => {
  const [itemData, setItemData] = useState(itemPropData);
  const [images, setImages] = useState(itemPropData.images);
  const [image, setImage] = useState(itemPropData.images[0].url);

  const [cookies, setCookie, removeCookie] = useCookies([
    "ID",
    "SL"
  ]);

  function changeMainImage(imgURL) {
    setImage(imgURL);
  }

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
    if (cookies.SL != "" && cookies.SL != undefined) {
      let savedList = cookies.SL;
      if(savedList.length <= 0){
        return null
      }
      savedList = savedList.split(";");

      for (let x = 0; x < savedList.length; x++) {
        if (savedList[x] == itemData.id) {
          setSaved(true);
        }
      }
    }
  }, [cookies.SL, cookies.ID]);

  return (
    <>
      <SEO seoTitle={"Itemsplanet - " + itemData.title} seoDescription={itemData.description} seoUrl={PageURL} seoImage={itemData.images.length > 1 ? itemData.images[1].url : itemData.images[0].url} />
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
                <h1>{itemData.title.toUpperCase()}</h1>
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
                <button
                  onClick={() => {
                    console.log(itemData.id);
                    saveToUser(itemData.id);
                  }}
                  className="saveItemPage"
                >
                  {saved == false ? (
                    <>
                      <i className="fas fa-heart"></i>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-heart-broken"></i>
                    </>
                  )}
                </button>
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
        
        <Ads />

        <Footer />
      </div>
    </>
  );
};

export async function getItemData(itemName) {
  const cmsURL =
    "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
  const ITEMQUERY = `
  query MyQuery {
    itemConnection(where: {title: "${itemName.replace(/_/g, " ")}"}) {
      edges {
        node {
          title
          id
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
          description
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
  const PageURL = `https://www.itemsplanet.com/items/${params.item.replace(
    / /g,
    "_"
  )}`;
  return {
    props: {
      itemPropData,
      PageURL,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const cmsURL =
    "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
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
        item: item.node.title.toLowerCase().replace(/ /g, "_"),
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export default ItemPage;
