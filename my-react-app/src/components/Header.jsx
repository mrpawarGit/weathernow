import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Handle theme changes
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="theme-toggle-fixed">
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
        {/* <span className="toggle-label">{darkMode ? "Dark" : "Light"}</span> */}
      </button>
    </div>
  );
};

export default Header;
