import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-table">
          <table>
            <tbody>
              <tr>
                <th>Quick Links</th>
                <th>Contact Us</th>
                <th>Legal</th>
                <th>Follow Us</th>
              </tr>
              <tr>
                <td>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </td>
                <td>
                  <Link href="/">
                    <a>Email</a>
                  </Link>
                </td>
                <td>
                  <Link href="/policies/cookie_policy">
                    <a>Cookie Policy</a>
                  </Link>
                </td>
                <td className="social-flex">
                  <a
                    href="https://www.tiktok.com/@itemsplanet"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </td>
                <td>
                  <Link href="/promote_your_item">
                    <a>Promote Your Item</a>
                  </Link>
                </td>
                <td>
                  <Link href="/policies/terms_of_use">
                    <a>Terms Of use</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link href="/categories">
                    <a>Categories</a>
                  </Link>
                </td>
                <td></td>
                <td>
                  <Link href="/policies/privacy_policy">
                    <a>Privacy Policy</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link href="/sitemap.xml">
                    <a>SiteMap</a>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer-credits">
          <div className="copyright">
            <p>©2021 Itemsplanet, All Rights Reserved.</p>
          </div>
          <div className="credits">
            <p>
              <Link href="https://www.github.com/Siddhart">
                <a>Made By Siddhart</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
