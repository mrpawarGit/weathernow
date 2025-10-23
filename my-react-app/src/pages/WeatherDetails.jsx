import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import "./WeatherDetails.css";

const WeatherDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p className="loading-text">Loading weather data...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">🌍</div>
          <h2 className="error-title">City Not Found</h2>
          <p className="error-message">
            We couldn't find weather information for "{city}". Please check the
            spelling and try again.
          </p>
          <button className="back-to-search-btn" onClick={() => navigate("/")}>
            <span className="back-icon">←</span>
            <span>Back to Search</span>
          </button>
        </div>
      </div>
    );

  return <WeatherCard weather={weather} />;
};

export default WeatherDetails;
