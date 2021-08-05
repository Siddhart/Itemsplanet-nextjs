module.exports = {
  env:{
    GRAPHCMS: "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master"
  },
  webpack5: true,
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
    domains: ["media.graphcms.com", "www.itemsplanet.com"],
  },
};
