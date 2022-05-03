//html parser
import ReactHtmlParser from "react-html-parser";

//components
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

//grahql
import { request } from "graphql-request";

//SEO
import SEO from "../../components/SEO";

export default function Category({ policyData }) {
  return (
    <>
      <SEO
        seoTitle={"Itemsplanet - " + policyData.title}
        seoDescription={"Read about our " + policyData.title + "."}
        seoUrl={
          "https://www.itemsplanet.com/policies/" +
          policyData.title.toLowerCase().replace(/ /g, "_")
        }
      />
      <div className="container">
        <div className="navcontainer">
          <Nav />
        </div>

        <div className="grid-title">
          <p>{policyData.title.toUpperCase()}</p>
        </div>
        <p
          style={{
            textAlign: "center",
            color: "grey",
            fontSize: "21px",
            fontWeight: "bolder",
            marginTop: "-25px",
          }}
        >
          Last Edit: {policyData.updatedAt.slice(0, 10)}
        </p>

        <div className="policyContent">
          {ReactHtmlParser(policyData.content.html)}
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  let policyName = params.policy;

  const cmsURL =
    "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
  const QUERY = `query MyQuery {
    policiesConnection(where: {_search: "${policyName.replace(/_/g, " ")}"}) {
      edges {
        node {
          title
          content{
            html
          }
          updatedAt
        }
      }
    }
  }
  `;

  const res = await request(cmsURL, QUERY);
  const policyData = res.policiesConnection.edges[0].node;
  return {
    props: {
      policyData,
    },
  };
}

export async function getStaticPaths() {
  const cmsURL =
    "https://api-eu-central-1.graphcms.com/v2/ckoxen8nkorja01z71sul3k0h/master";
  const QUERY = `query MyQuery {
    policiesConnection(first: 2500) {
      edges {
        node {
          title
        }
      }
    }
  }
  `;

  const res = await request(cmsURL, QUERY);
  const paths = res.policiesConnection.edges.map((policyObj) => {
    return {
      params: {
        policy: policyObj.node.title.toLowerCase().replace(/ /g, "_"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
