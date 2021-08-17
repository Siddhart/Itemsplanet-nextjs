//react components
import { useState, useEffect } from "react";

//next components
import Link from "next/link";

//components
import Nav from "../components/Nav";
import Footer from "../components/Footer";

//SEO
import SEO from '../components/SEO'

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  function initPage() {
    fetch(`./dataChunks/categories/mainPage.json`)
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
      <SEO seoTitle="Itemsplanet - Categories" seoDescription="Browse trough all our categories. Find gadgets and trending items" seoUrl='https:"//www.itemsplanet.com/categories' />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

        <div className="grid-title">
          <p>CATEGORIES</p>
        </div>
        <div className="item-grid">
          {categories.map((cat) => {
            return (
              <div key={cat.categoryName} className="item category_card">
                <Link
                  href={`./category/${cat.categoryName.toLowerCase().replace(/ /g, "_")}`}
                >
                  <a>
                    <div className="item-image-container">
                      <img alt={cat.categoryName} src={cat.categoryImage} />
                    </div>
                  </a>
                </Link>
                <p className="item-title category">{cat.categoryName.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}
