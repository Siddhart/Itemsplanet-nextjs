//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = require("../next.config").env.SUPABASEURL;
const PublicAnonKey = require("../next.config").env.PUBLICANONKEY;

//supabase
const supabase = createClient(SupabaseURL, PublicAnonKey);

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

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
    if(cookies.SL != ''){
      let savedList = (cookies.SL)
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
    if(itemData.backgroundImage){
      imageUrl = itemData.backgroundImage.url;
    }else{
      imageUrl = itemData.image
    }
    // itemUrl = `https://www.itemsplanet.com/blogs/${itemData.title}`.replace(
    //   / /g,
    //   "_"
    // );
    itemUrl = `http://localhost:3000/blogs/${itemData.title}`.replace(
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
      <a href={itemUrl}>
        <div className="item-image-container" style={{ position: "relative" }}>
          <Image src={imageUrl} alt={itemData.title} layout="fill" />
        </div>
      </a>
      <button
        onClick={() => {
          saveToUser(itemData.id);
          setSaved(!saved)
        }}
        className="savebutton"
      >
        {saved == false ? <><i className="fas fa-heart"></i></> : <><i className="fas fa-envelope"></i></>}
      </button>
      <p className="item-title">{itemData.title}</p>
    </div>
  );
};

export default Card;