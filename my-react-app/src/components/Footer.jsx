import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="made-with">
          Made with using React & Open-Meteo API © {currentYear}{" "}
          <span className="highlight">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mrpawarGit/weathernow"
            >
              WeatherNow
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
