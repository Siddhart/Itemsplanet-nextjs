module.exports = {
    env:{
      GRAPHCMS: "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master",
      SUPABASEURL: "https://apbrajlcunciizanpygs.supabase.co",
      PUBLICANONKEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE",
    },
    webpack5: true,
    reactStrictMode: true,
    images: {
      loader: "imgix",
      path: "",
      domains: ["media.graphcms.com", "www.itemsplanet.com"],
    },
  };
  