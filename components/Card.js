import Image from "next/image";
import React from "react";

const Card = ({ itemData, saveToUser }) => {
  let itemUrl;
  let blog = itemData.blog;

  let imageUrl;

  if (blog == false) {
    imageUrl = itemData.images[0].url;
    // itemUrl = `https://www.itemsplanet.com/items/${itemData.title}`.replace(
    //   / /g,
    //   "_"
    // );

    itemUrl = `http://localhost:3000/items/${itemData.title}`.replace(
      / /g,
      "_"
    );
  }

  if (blog == true) {
    imageUrl = itemData.backgroundImage.url;
    // itemUrl = `https://www.itemsplanet.com/blogs/${itemData.title}`.replace(
    //   / /g,
    //   "_"
    // );
    itemUrl = `http://localhost:3000/blogs/${itemData.title}`.replace(
      / /g,
      "_"
    );
  }

  if(itemData.blogCardImage){
    imageUrl = itemData.blogCardImage
  }

  return (
    <div className={itemData.cardClass}>
      {blog ? (
        <div className="blog">
          <i className="fas fa-book"></i>
        </div>
      ) : (
        ""
      )}
      <a href={itemUrl}>
        <div className="item-image-container" style={{ position: "relative" }}>
          <Image src={imageUrl} alt={itemData.title} layout="fill" />
        </div>
      </a>
      <button onClick={() =>{saveToUser(itemData.id)}} className="savebutton">
        <i className="fas fa-heart"></i>
      </button>
      <p className="item-title">{itemData.title}</p>
    </div>
  );
};

export default Card;
