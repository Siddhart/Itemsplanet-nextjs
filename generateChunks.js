//dotenv
require("dotenv").config();

//supabase variables
const { createClient } = require("@supabase/supabase-js");

const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co";
const SupabaseService = process.env.SERVICE;

const MainURL = "https://www.itemsplanet.com";

const Endpoints = ["/categories", "/blogs", "/signin", "/signup", "/featured"];

const fs = require("fs");
const { request, gql } = require("graphql-request");
const GRAPHCMS =
  "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";

const supabase = createClient(SupabaseURL, SupabaseService);
const amountPerChunk = 6;

const query = gql`
  query MyQuery {
    blogsConnection(first: 2500) {
      edges {
        node {
          id
          title
          backgroundImage {
            url
          }
          images(first: 1) {
            url
          }
          updatedAt
        }
      }
    }
    itemConnection(first: 2500) {
      edges {
        node {
          id
          title
          images(first: 1) {
            url
          }
          featured
          updatedAt
        }
      }
    }
    categoriesConnection(first: 2500) {
      edges {
        node {
          id
          category
          categoryImage {
            url
          }
          updatedAt
        }
      }
    }
  }
`;

export function generateeverythingboi() {
  const classArray = ["item card_medium", "item card_large"];
  request(GRAPHCMS, query).then(async (data) => {
    let totalChunkArray = data.itemConnection.edges
      .concat(data.blogsConnection.edges)
      .chunk(amountPerChunk);

    totalChunkArray.map((objList, chunkNum) => {
      objList.map((obj) => {
        if (obj.node.backgroundImage) {
          obj.node["cardClass"] = "item card_large";
          obj.node["blogCardImage"] = obj.node.images[0].url;
          obj.node["blog"] = true;
        } else {
          obj.node["cardClass"] =
            classArray[Math.floor(Math.random() * classArray.length)];
          obj.node["blog"] = false;
        }
      });

      const nextChunk =
        chunkNum + 1 != totalChunkArray.length ? chunkNum + 1 : "none";

      createChunk(
        `./public/dataChunks/mainpage/${chunkNum}.json`,
        objList,
        nextChunk
      );
    });

    //save all items in supabase database

    let totalObjectsToDB = data.itemConnection.edges.concat(
      data.blogsConnection.edges
    );

    let DBObj = totalObjectsToDB.map((obj) => {
      let DbClass;
      let DBImage;
      let DBBlog;

      if (obj.node.backgroundImage) {
        DbClass = "item card_large";
        DBBlog = true;
      } else {
        DbClass = classArray[Math.floor(Math.random() * classArray.length)];
        DBBlog = false;
      }

      DBImage = obj.node.images[0].url;

      return {
        id: obj.node.id,
        title: obj.node.title,
        image: DBImage,
        cardClass: DbClass,
        blog: DBBlog,
      };
    });

    await supabase.from("search").delete("*");

    await supabase.from("search").insert(DBObj);

    //create blog chunks
    let totalBlogChunkArray = data.blogsConnection.edges.chunk(amountPerChunk);
    totalBlogChunkArray.map((objList, chunkNum) => {
      const nextChunk =
        chunkNum + 1 != totalBlogChunkArray.length ? chunkNum + 1 : "none";

      objList.map((obj) => {
        obj.node["cardClass"] = "item card_large";
        obj.node["blogCardImage"] = obj.node.images[0].url;
        obj.node["blog"] = true;
      });
      createChunk(
        `./public/dataChunks/blogs/${chunkNum}.json`,
        objList,
        nextChunk
      );
    });

    //create featured chunks
    const featuredArray = data.itemConnection.edges.filter(
      (obj) => obj.node.featured == true
    );
    let totalFeaturedChunkArray = featuredArray.chunk(amountPerChunk);
    totalFeaturedChunkArray.map((objList, chunkNum) => {
      const nextChunk =
        chunkNum + 1 != totalFeaturedChunkArray.length ? chunkNum + 1 : "none";
      objList.map((obj) => {
        obj.node["cardClass"] = "item card_featured";
        obj.node["blog"] = false;
      });

      createChunk(
        `./public/dataChunks/featured/${chunkNum}.json`,
        objList,
        nextChunk
      );
    });

    //create all categories file
    const categoryList = data.categoriesConnection.edges.map((cat) => {
      return {
        categoryName: cat.node.category,
        categoryImage: cat.node.categoryImage.url,
      };
    });

    fs.writeFileSync(
      "./public/dataChunks/categories/mainPage.json",
      JSON.stringify(categoryList)
    );

    //create categoryPage Chunks
    categoryList.map((cat) => {
      const CatQeury = `query MyQuery {
      itemConnection(first: 2500, where: {categories_some: {_search: "${cat.categoryName}"}}) {
        edges {
          node {
            id
            title
            images(first: 1) {
              url
            }
            featured
          }
        }
      }
    }`;

      request(GRAPHCMS, CatQeury).then((data) => {
        let totalChunkArray = data.itemConnection.edges.chunk(amountPerChunk);
        let catName = cat.categoryName.replace(/ /g, "_");
        totalChunkArray.map((objList, chunkNum) => {
          const nextChunk =
            chunkNum + 1 != totalChunkArray.length ? chunkNum + 1 : "none";

          objList.map((obj) => {
            obj.node["cardClass"] =
              classArray[Math.floor(Math.random() * classArray.length)];
            obj.node["blog"] = false;
          });

          createChunk(
            `./public/dataChunks/categories/${
              catName.toString() + chunkNum.toString()
            }.json`,
            objList,
            nextChunk
          );
        });
      });
    });

    //create the sitemap boi
    createSitemap();
  });
}

function func(a, b) {
  return 0.5 - Math.random();
}

function createChunk(fileName, content, next) {
  fs.writeFileSync(
    fileName,
    JSON.stringify(content.sort(func).sort(func).concat({ nextChunk: next }))
  );
}

function createSitemapObject(sitemapENDPOINT, sitemapLASTMOD) {
  let obj = `
  <url>
    <loc>${MainURL}${sitemapENDPOINT}</loc>
    <lastmod>${sitemapLASTMOD}</lastmod>
    <priority>0.80</priority>
  </url>
  `;
  return obj;
}

function createSitemap() {
  let sitemapArray = [];
  let whatsthetimenowhuh = new Date().toISOString();

  sitemapArray.push(
    `<url><loc>${MainURL}/</loc><lastmod>${whatsthetimenowhuh}</lastmod><priority>1.00</priority></url>`
  );

  sitemapArray = Endpoints.map((endpoint) => {
    return createSitemapObject(endpoint, whatsthetimenowhuh);
  });

  let sitemapString = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${sitemapArray.join(
    ""
  )}</urlset>`;
  fs.writeFileSync("./public/sitemap.xml", sitemapString);
}

Array.range = function (n) {
  return Array.apply(null, Array(n)).map((x, i) => i);
};

Object.defineProperty(Array.prototype, "chunk", {
  value: function (n) {
    return Array.range(Math.ceil(this.length / n)).map((x, i) =>
      this.slice(i * n, i * n + n)
    );
  },
});