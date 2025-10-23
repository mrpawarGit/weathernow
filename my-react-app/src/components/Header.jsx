import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  // Handle theme changes
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add shadow when scrolled
      setScrolled(currentScrollY > 10);

      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""} ${
        showHeader ? "visible" : "hidden"
      }`}
    >
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo Section */}
          <Link to="/" className="brand-link">
            <div className="logo-wrapper">
              <img src={logo} alt="WeatherNow Logo" className="logo-img" />
              <span className="brand-text">WeatherNow</span>
            </div>
          </Link>

          {/* Navigation Links */}
          {/* <div className="nav-links">
            <Link to="/" className={`nav-link ${isHomePage ? "active" : ""}`}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
            <a
              href="https://github.com/mrpawarGit/weathernow"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="View GitHub repository"
            >
              <span className="nav-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </span>
              <span>GitHub</span>
            </a>
          </div> */}

          {/* Theme Toggle */}
          <div className="theme-toggle-wrapper">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              title={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              <div className={`toggle-track ${darkMode ? "dark" : "light"}`}>
                <div className="toggle-thumb">
                  <span className="toggle-icon">{darkMode ? "🌙" : "☀️"}</span>
                </div>
              </div>
              <span className="toggle-label">
                {darkMode ? "Dark" : "Light"}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
