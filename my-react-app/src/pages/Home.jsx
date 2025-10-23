import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Popular cities for quick access
  const popularCities = [
    { name: "Mumbai", emoji: "🏙️" },
    { name: "Delhi", emoji: "🏛️" },
    { name: "Bangalore", emoji: "🌳" },
    { name: "Pune", emoji: "🎓" },
    { name: "London", emoji: "🇬🇧" },
    { name: "New York", emoji: "🗽" },
    { name: "Tokyo", emoji: "🗾" },
    { name: "Paris", emoji: "🗼" },
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Simple autocomplete with popular cities
  useEffect(() => {
    if (city.trim().length > 1) {
      const filtered = popularCities.filter((c) =>
        c.name.toLowerCase().includes(city.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [city]);

  const saveRecentSearch = (cityName) => {
    const updated = [
      cityName,
      ...recentSearches.filter(
        (c) => c.toLowerCase() !== cityName.toLowerCase()
      ),
    ].slice(0, 5); // Keep only last 5 searches
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      const trimmedCity = city.trim();
      saveRecentSearch(trimmedCity);
      navigate(`/weather/${trimmedCity}`);
    }
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    setShowSuggestions(false);
    saveRecentSearch(cityName);
    navigate(`/weather/${cityName}`);
  };

  // Get user's current location
  const handleCurrentLocation = () => {
    setLoadingLocation(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using Open-Meteo
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            const cityName = data.results[0].name;
            saveRecentSearch(cityName);
            navigate(`/weather/${cityName}`);
          }
        } catch (err) {
          setError("Failed to get location name");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLoadingLocation(false);
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="weather-icon-large">⛅</div>
          <h1 className="main-title">WeatherNow</h1>
          <p className="subtitle">
            Get real-time weather updates for any city worldwide
          </p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => city.length > 1 && setShowSuggestions(true)}
                autoComplete="off"
              />
              {city && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => {
                    setCity("");
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleCityClick(suggestion.name)}
                  >
                    <span className="suggestion-emoji">{suggestion.emoji}</span>
                    <span className="suggestion-name">{suggestion.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="button-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!city.trim()}
              >
                <span>Search Weather</span>
                <span className="btn-icon">→</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCurrentLocation}
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <>
                    <span className="spinner"></span>
                    <span>Getting Location...</span>
                  </>
                ) : (
                  <>
                    <span>📍</span>
                    <span>Use My Location</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="section-header">
              <h3>Recent Searches</h3>
              <button
                className="clear-history-btn"
                onClick={clearRecentSearches}
                aria-label="Clear history"
              >
                Clear All
              </button>
            </div>
            <div className="recent-chips">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="chip"
                  onClick={() => handleCityClick(search)}
                >
                  <span>🕐</span>
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities */}
        <div className="popular-cities">
          <h3 className="section-title">Popular Cities</h3>
          <div className="city-grid">
            {popularCities.map((city, index) => (
              <button
                key={index}
                className="city-card"
                onClick={() => handleCityClick(city.name)}
              >
                <span className="city-emoji">{city.emoji}</span>
                <span className="city-name">{city.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🌡️</div>
            <h4>Real-Time Data</h4>
            <p>Get accurate weather updates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Detailed Forecast</h4>
            <p>Hourly & daily predictions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h4>Global Coverage</h4>
            <p>Weather data worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
