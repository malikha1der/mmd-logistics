import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "../config/contactInfo";
import "../styles/Footer.css";

function Footer() {

  const year = useMemo(() => new Date().getFullYear(), []);

  const companyLinks = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/services", label: "Services" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/contact", label: "Contact" },
    ],
    []
  );

  return (
    <footer className="footer">

      <div className="container footer__grid">

        {/* Brand */}

        <div className="footer__brand">

          <span className="footer__logo">
            <span className="footer__logo-mark">
              MMD
            </span>{" "}
            LOGISTICS
          </span>

          <p className="footer__tagline">
            Reliable freight dispatch and 53' dry van capacity,
            moving loads across all 50 states.
          </p>

        </div>

        {/* Company */}

        <div className="footer__col">

          <h3 className="footer__heading">
            Company
          </h3>

          <ul>

            {companyLinks.map((link) => (

              <li key={link.to}>

                <Link to={link.to}>
                  {link.label}
                </Link>

              </li>

            ))}

          </ul>

        </div>

        {/* Dispatch */}

        <div className="footer__col">

          <h3 className="footer__heading">
            Dispatch
          </h3>

          <ul>

            <li>

              <a href={CONTACT_INFO.phoneHref}>
                {CONTACT_INFO.phone}
              </a>

            </li>

            <li>

              <a href={CONTACT_INFO.emailHref}>
                {CONTACT_INFO.email}
              </a>

            </li>

            <li>
              Available 24/7 for load booking
            </li>

          </ul>

        </div>

        {/* Coverage */}

        <div className="footer__col">

          <h3 className="footer__heading">
            Coverage
          </h3>

          <ul>

            <li>All 50 U.S. states</li>

            <li>53' dry van fleet</li>

            <li>Full truckload &amp; dedicated lanes</li>

          </ul>

        </div>

      </div>

      <div className="container footer__bottom">

        <p>
          &copy; {year} MMD Logistics. All rights reserved.
        </p>

        <p>
          DOT # ------ &nbsp;|&nbsp; MC # ------
        </p>

      </div>

    </footer>
  );
}

export default memo(Footer);