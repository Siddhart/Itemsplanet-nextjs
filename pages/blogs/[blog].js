//react components
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

//components
import Nav from "/components/Nav";
import Footer from "/components/Footer";

//graphql
import { request } from "graphql-request";

//SEO
import SEO from '../../components/SEO'

const BlogPage = ({ blogPropData, PageURL }) => {
  const [blogData, setItemData] = useState(blogPropData);
  const [image, setImage] = useState(blogPropData.backgroundImage.url);

  return (
    <>
      <SEO seoTitle={"Itemsplanet - " + blogPropData.title} seoDescription={blogPropData.shortDescription} seoUrl={'https://www.itemsplanet.com/blogs/' + blogPropData.title.toLowerCase().replace(/ /g, "_")}/>
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

export async function getBlogData(blogName) {
  const cmsURL = "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
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
  const cmsURL = "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
  const QUERY = `query MyQuery {
    blogsConnection(first: 1000) {
      edges {
        node {
          title
        }
      }
    }
  }`;

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
    fallback: 'blocking',
  };
}

export default BlogPage;