//react and nextjs components
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

import { request } from "graphql-request";
import Head from "next/head";

import Nav from "/components/Nav";
import Footer from "/components/Footer";
import SmallImage from "/components/SmallImage";

const BlogPage = ({ blogPropData, PageURL }) => {
  const [blogData, setItemData] = useState(blogPropData);
  const [image, setImage] = useState(blogPropData.backgroundImage.url);

  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>
        <div className="blog-main-image">
            <img alt={blogData.title.toUpperCase()} src={image} />
        </div>

        <div className="blog-content">

            <div className="title-and-desc">
                <h1 className="blog-title">{blogData.title.toUpperCase()}</h1>
                <p className="blog-last-edited">{blogData.publishedBy.createdAt.slice(0,10)}</p>
                <p className="blog-desc">{blogData.shortDescription}</p>
            </div>

            <div className="blog-text-content">
                {ReactHtmlParser(blogData.content.html)}
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

// ItemPage.getInitialProps = async (ctx) => {
//   console.log(ctx.req.headers.referer);

//   const cmsURL = process.env.GRAPHCMS;
//   const ITEMQUERY = `
//   query MyQuery {
//     itemConnection(where: {title: "${ctx.query.item.replace(/_/g, " ")}"}) {
//       edges {
//         node {
//           title
//           images(first: 100) {
//             url
//             handle
//           }
//           featured
//           updatedAt
//           longDescription {
//             html
//           }
//           affiliateUrl
//         }
//       }
//     }
//   }
//   `;

//   let res = await request(cmsURL, ITEMQUERY);
//   return {
//     data: res.itemConnection.edges[0].node,
//     PageURL: ctx.req.headers.referer,
//   };
// };

export async function getBlogData(blogName) {
  const cmsURL = process.env.GRAPHCMS;
  const BLOGQUERY = `
  query MyQuery {
    blog(where: {title: "${blogName.replace(/_/g, " ")}"}) {
      id
      title
      shortDescription
      publishedBy {
        createdAt
      }
      images(first: 100) {
        id
      }
      backgroundImage {
        url
      }
      content {
        html
      }
    }
  }
  `;

  let res = await request(cmsURL, BLOGQUERY);

  return {
    blogName,
    ...res.blog,
  };
}

export async function getStaticProps({ params }) {
  const blogPropData = await getBlogData(params.blog);
  return {
    props: {
      blogPropData,
    },
  };
}

export async function getStaticPaths() {
  const cmsURL = process.env.GRAPHCMS;
  const QUERY = `query MyQuery {
    blogsConnection(first: 1000) {
      edges {
        node {
          title
        }
      }
    }
  }
  
  `;

  const res = await request(cmsURL, QUERY);

  const paths = res.blogsConnection.edges.map((blog) => {
    return {
      params: {
        blog: blog.node.title.replace(/ /g, "_"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default BlogPage;