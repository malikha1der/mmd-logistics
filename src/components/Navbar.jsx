import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "../styles/Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Read scroll position at most once per animation frame. This keeps the
  // navbar responsive without doing React work for every scroll event.
  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        setIsScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Allow Escape to close the mobile menu.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleQuoteClick = (event) => {
    closeMenu();

    if (location.pathname === "/services") {
      event.preventDefault();
      document.body.style.overflow = "";
      setTimeout(() => {
        const element = document.getElementById("get-a-quote");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);

      if (window.location.hash !== "#get-a-quote") {
        window.history.pushState(null, "", "/services#get-a-quote");
      }
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <NavLink
          to="/"
          className="navbar__logo"
          onClick={closeMenu}
          aria-label="MMD Logistics home"
        >
          <span
            className="navbar__logo-mark"
            aria-hidden="true"
          >
            MMD
          </span>

          <span
            className="navbar__logo-text"
            aria-hidden="true"
          >
            LOGISTICS
          </span>
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span
            className={`navbar__bar ${
              isOpen ? "navbar__bar--open" : ""
            }`}
            aria-hidden="true"
          />

          <span
            className={`navbar__bar ${
              isOpen ? "navbar__bar--open" : ""
            }`}
            aria-hidden="true"
          />

          <span
            className={`navbar__bar ${
              isOpen ? "navbar__bar--open" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__nav ${
            isOpen ? "navbar__nav--open" : ""
          }`}
          aria-label="Primary"
        >
          <ul className="navbar__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${
                      isActive ? "navbar__link--active" : ""
                    }`
                  }
                  onClick={() => {
                    closeMenu();
                    if (location.pathname === link.to && window.location.hash) {
                      window.history.pushState(null, "", link.to);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <NavLink
            to="/services#get-a-quote"
            className="navbar__cta"
            onClick={handleQuoteClick}
          >
            Get a Quote
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;