import React, { useState } from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weather }) => {
  const [showMap, setShowMap] = useState(false);

  // Format temperature
  const formatTemp = (temp) => Math.round(temp);

  // Get weather background gradient based on condition
  const getWeatherGradient = (main) => {
    const gradients = {
      Clear: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      Clouds: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      Rain: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      Drizzle: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
      Thunderstorm: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      Snow: "linear-gradient(135deg, #e6dada 0%, #274046 100%)",
      Mist: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
      Smoke: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
      Haze: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      Fog: "linear-gradient(135deg, #d7d2cc 0%, #304352 100%)",
    };
    return (
      gradients[main] || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    );
  };

  // Get time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 21) return "Evening";
    return "Night";
  };

  // Format wind speed
  const formatWindSpeed = (speed) => (speed * 3.6).toFixed(1); // Convert m/s to km/h

  // Get wind direction
  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  // Get visibility in km
  const getVisibility = (visibility) => (visibility / 1000).toFixed(1);

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="weather-card-container">
      {/* Hero Weather Section */}
      <div
        className="weather-hero"
        style={{ background: getWeatherGradient(weather.weather[0].main) }}
      >
        <div className="weather-hero-content">
          <div className="location-info">
            <h2 className="city-name">{weather.name}</h2>
            <p className="country-name">{weather.sys.country}</p>
            <p className="time-of-day">{getTimeOfDay()}</p>
          </div>

          <div className="weather-main">
            <div className="weather-icon-wrapper">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="weather-icon-large"
              />
            </div>
            <div className="temperature-display">
              <h1 className="temperature">{formatTemp(weather.main.temp)}°</h1>
              <div className="temp-details">
                <p className="feels-like">
                  Feels like {formatTemp(weather.main.feels_like)}°
                </p>
                <p className="weather-description">
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="temp-range">
            <div className="temp-range-item">
              <span className="range-icon">↑</span>
              <span className="range-label">High</span>
              <span className="range-value">
                {formatTemp(weather.main.temp_max)}°
              </span>
            </div>
            <div className="temp-divider"></div>
            <div className="temp-range-item">
              <span className="range-icon">↓</span>
              <span className="range-label">Low</span>
              <span className="range-value">
                {formatTemp(weather.main.temp_min)}°
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="weather-details">
        <div className="details-grid">
          {/* Humidity */}
          <div className="detail-card">
            <div className="detail-icon">💧</div>
            <div className="detail-info">
              <p className="detail-label">Humidity</p>
              <p className="detail-value">{weather.main.humidity}%</p>
            </div>
          </div>

          {/* Wind */}
          <div className="detail-card">
            <div className="detail-icon">💨</div>
            <div className="detail-info">
              <p className="detail-label">Wind Speed</p>
              <p className="detail-value">
                {formatWindSpeed(weather.wind.speed)} km/h
              </p>
              <p className="detail-sub">
                {getWindDirection(weather.wind.deg)} {weather.wind.deg}°
              </p>
            </div>
          </div>

          {/* Pressure */}
          <div className="detail-card">
            <div className="detail-icon">🌡️</div>
            <div className="detail-info">
              <p className="detail-label">Pressure</p>
              <p className="detail-value">{weather.main.pressure} hPa</p>
            </div>
          </div>

          {/* Visibility */}
          <div className="detail-card">
            <div className="detail-icon">👁️</div>
            <div className="detail-info">
              <p className="detail-label">Visibility</p>
              <p className="detail-value">
                {getVisibility(weather.visibility)} km
              </p>
            </div>
          </div>

          {/* Cloudiness */}
          <div className="detail-card">
            <div className="detail-icon">☁️</div>
            <div className="detail-info">
              <p className="detail-label">Cloudiness</p>
              <p className="detail-value">{weather.clouds.all}%</p>
            </div>
          </div>

          {/* Sunrise */}
          <div className="detail-card">
            <div className="detail-icon">🌅</div>
            <div className="detail-info">
              <p className="detail-label">Sunrise</p>
              <p className="detail-value">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>

          {/* Sunset */}
          <div className="detail-card">
            <div className="detail-icon">🌇</div>
            <div className="detail-info">
              <p className="detail-label">Sunset</p>
              <p className="detail-value">{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>

          {/* Sea Level (if available) */}
          {weather.main.sea_level && (
            <div className="detail-card">
              <div className="detail-icon">🌊</div>
              <div className="detail-info">
                <p className="detail-label">Sea Level</p>
                <p className="detail-value">{weather.main.sea_level} hPa</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="weather-map-section">
        <button className="map-toggle-btn" onClick={() => setShowMap(!showMap)}>
          <span className="map-icon">🗺️</span>
          <span>{showMap ? "Hide Map" : "Show Location Map"}</span>
          <span className={`map-arrow ${showMap ? "open" : ""}`}>▼</span>
        </button>

        {showMap && (
          <div className="map-container">
            <iframe
              title="Location Map"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}&z=12&output=embed`}
            ></iframe>
            <div className="map-coordinates">
              <span>📍 Coordinates: </span>
              <span>
                {weather.coord.lat.toFixed(4)}°, {weather.coord.lon.toFixed(4)}°
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="weather-footer">
        <p className="last-updated">
          Last updated: {new Date(weather.dt * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
