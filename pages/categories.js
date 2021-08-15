//react components
import { useState, useEffect } from "react";

//next components
import Head from "next/head";
import Link from "next/link";

//components
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  function initPage() {
    fetch(`https://raw.githubusercontent.com/Siddhart/Itemsplanet-nextjs/main/public//dataChunks/categories/mainPage.json`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(categories.concat(data));
      });
  }

  useEffect(() => {
    setCategories([]);
    initPage();
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
          <p>CATEGORIES</p>
        </div>
        <div className="item-grid">
          {categories.map((cat) => {
            return <div key={cat.categoryName} className="item category_card">
              <Link href={`./category/${cat.categoryName.replace(/ /g, "_")}`}><a>
                <div className="item-image-container">
                  <img alt={cat.categoryName} src={cat.categoryImage} />
                </div>
              </a></Link>
              <p className="item-title category">{cat.categoryName}</p>
            </div>;
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}