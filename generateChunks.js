const fs = require("fs");
const { request, gql } = require("graphql-request");
const GRAPHCMS = require("./next.config").env.GRAPHCMS;

const amountPerChunk = 6;

const query = gql`
  query MyQuery {
    blogsConnection(first: 2500) {
      edges {
        node {
          title
          backgroundImage {
            url
          }
        }
      }
    }
    itemConnection(first: 2500) {
      edges {
        node {
          title
          images(first: 1) {
            url
          }
          featured
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
        }
      }
    }
  }
`;

const classArray = ["item card_medium", "item card_large"];

request(GRAPHCMS, query).then((data) => {
  let totalChunkArray = data.itemConnection.edges
    .concat(data.blogsConnection.edges)
    .chunk(amountPerChunk);
  totalChunkArray.map((objList, chunkNum) => {
    objList.map((obj) => {
      if (obj.node.backgroundImage) {
        obj.node["cardClass"] = "item card_large";
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

  //create blog chunks
  let totalBlogChunkArray = data.blogsConnection.edges.chunk(amountPerChunk);
  totalBlogChunkArray.map((objList, chunkNum) => {
    const nextChunk =
      chunkNum + 1 != totalBlogChunkArray.length ? chunkNum + 1 : "none";

    objList.map((obj) => {
      obj.node["cardClass"] = "item card_large";
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
      obj.node["cardClass"] = "item card_large";
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
          }
        }
      }
    }`;

    request(GRAPHCMS, CatQeury).then((data) => {
      let totalChunkArray = data.itemConnection.edges.chunk(amountPerChunk);
      let catName = cat.categoryName.replace(/ /g, "_")
      totalChunkArray.map((objList, chunkNum) => {
        const nextChunk =
          chunkNum + 1 != totalChunkArray.length ? chunkNum + 1 : "none";
    
        createChunk(
          `./public/dataChunks/categories/${catName.toString() + chunkNum.toString()}.json`,
          objList,
          nextChunk
        );
      });
    });
  });
});

function func(a, b) {
  return 0.5 - Math.random();
}

function createChunk(fileName, content, next) {
  fs.writeFileSync(
    fileName,
    JSON.stringify(content.sort(func).sort(func).concat({ nextChunk: next }))
  );
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
