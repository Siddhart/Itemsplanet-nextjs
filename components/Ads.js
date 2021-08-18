import React, { useEffect } from "react";
import Head from "next/head";

const Ads = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7427232256160357"
          crossorigin="anonymous"
        ></script>
      </head>
      <ins
        className="adsbygoogle adbanner-customize"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center"
        }}
        data-ad-client="ca-pub-7427232256160357"
        data-ad-slot="8734531951"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
};

export default Ads;
