import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-white fs-4" to="/">
          WeatherNow
        </Link>

        <div className="d-flex align-items-center gap-2">
          <label
            className="form-check-label text-white"
            htmlFor="themeSwitch"
            title="Toggle dark/light mode"
            style={{ cursor: "pointer", fontSize: "1rem" }}
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </label>
          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="themeSwitch"
              checked={darkMode}
              onChange={toggleTheme}
              style={{ cursor: "pointer" }}
              aria-label="Theme toggle"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
