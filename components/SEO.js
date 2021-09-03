//next components
import Head from "next/head";

const SEO = ({ seoTitle, seoDescription, seoImage, seoUrl }) => {
  const defaultTitle = "Itemsplanet - Find Cool gadgets and trending items.";
  const defaultDesc =
    "Browse or search for cool items on our website. We have listed a lot of cool and cheap items.";

  return (
    <Head>
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
      />

      <title>{seoTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={seoTitle ? seoTitle : defaultTitle} />
      <meta
        property="og:description"
        content={seoDescription ? seoDescription : defaultDesc}
      />
      <meta property="og:url" content={seoUrl} />

      {seoImage ? <meta property="og:image" content={seoImage} /> : <meta property="og:image" content="https://www.itemsplanet.com/logo.png" />}

      <meta
        name="description"
        content={seoDescription ? seoDescription : defaultDesc}
      />
    </Head>
  );
};

export default SEO;
