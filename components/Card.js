import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const WorkURL = 'https://itemsplanet-nextjs.vercel.app'

const Card = ({ itemData, saveToUser }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "UID",
    "RTK",
    "AUTH",
    "EXP",
    "ID",
    "SL"
  ]);

  const classArray = ["item card_medium", "item card_large"];

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false)
    if(cookies.SL != '' && cookies.SL != undefined){
      let savedList = (cookies.SL)
      console.log(savedList)
      savedList = savedList.split(';')

      for(let x = 0; x < savedList.length; x++){
        if(savedList[x] == itemData.id){
          setSaved(true)
        }
      }
    }
  }, [cookies.SL, cookies.ID]);

  let itemUrl;
  let blog = itemData.blog;
  let imageUrl;
  let cardClass;

  if (blog == false || blog == undefined) {
    if(itemData.images){
      imageUrl = itemData.images[0].url;
    }else{
      imageUrl = itemData.image
    }

    itemUrl = `${WorkURL}/items/${itemData.title.toLowerCase()}`.replace(
      / /g,
      "_"
    );
  }

  if (blog == true) {
    if(itemData.backgroundImage){
      imageUrl = itemData.backgroundImage.url;
    }else{
      imageUrl = itemData.image
    }

    itemUrl = `${WorkURL}/blogs/${itemData.title.toLowerCase()}`.replace(
      / /g,
      "_"
    );
  }

  if (itemData.blogCardImage) {
    imageUrl = itemData.blogCardImage;
  }

  if(itemData.cardClass == undefined){
    cardClass = classArray[Math.floor(Math.random() * classArray.length)];
  }

  return (
    <div className={itemData.cardClass ? itemData.cardClass : cardClass}>
      {blog ? (
        <div className="blog">
          <i className="fas fa-book"></i>
        </div>
      ) : (
        ""
      )}
      <Link href={itemUrl}>
      <a>
        <div className="item-image-container" style={{ position: "relative" }}>
          <Image src={"https://media.graphcms.com/resize=height:300/" + imageUrl.split('/')[imageUrl.split('/').length - 1]} alt={itemData.title} layout="fill" />
        </div>
      </a>
      </Link>
      <button aria-label="Save Item"
        onClick={() => {
          saveToUser(itemData.id);
          setSaved(!saved)
        }}
        className="savebutton"
      >
        {saved == false ? <><i className="fas fa-heart"></i></> : <><i className="fas fa-heart-broken"></i></>}
      </button>
      <p className="item-title">{itemData.title.toUpperCase()}</p>
    </div>
  );
};

export default Card;