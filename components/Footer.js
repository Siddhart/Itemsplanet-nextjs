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
                    <a>Discord Server</a>
                  </Link>
                </td>
                <td>
                  <Link href="/">
                    <a>Privacy Policy</a>
                  </Link>
                </td>
                <td className="social-flex">
                  <Link href="/">
                    <a>
                      <i className="fab fa-tiktok"></i>
                    </a>
                  </Link>
                  <Link href="/">
                    <a>
                      <i className="fab fa-instagram"></i>
                    </a>
                  </Link>
                  <Link href="/">
                    <a>
                      <i className="fab fa-discord"></i>
                    </a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                <Link href="/">
                    <a>Blogs</a>
                  </Link>
                </td>
                <td>
                <Link href="/">
                    <a>Email</a>
                  </Link>
                </td>
                <td>
                <Link href="/">
                    <a>Cookie Policy</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                <Link href="/">
                    <a>Log In</a>
                  </Link>
                </td>
                <td>
                <Link href="/">
                    <a>Promote Your Item</a>
                  </Link>
                </td>
                <td>
                <Link href="/">
                    <a>Terms Of Use</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                <Link href="/">
                    <a>News</a>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                <Link href="/">
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
