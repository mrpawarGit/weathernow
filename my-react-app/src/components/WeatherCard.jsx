import React from "react";

const WeatherCard = ({ weather }) => (
  <div className="card text-center">
    <div className="card-body">
      <h2 className="card-title">{weather.name}</h2>
      <h4 className="card-subtitle mb-2 text-muted">
        {weather.weather[0].main}{" "}
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="icon"
        />
      </h4>
      <p className="card-text">🌡 Temperature: {weather.main.temp}°C</p>
      <p className="card-text">💧 Humidity: {weather.main.humidity}%</p>
      <iframe
        title="map"
        width="100%"
        height="200"
        style={{ border: 0 }}
        loading="lazy"
        src={`https://maps.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}&z=10&output=embed`}
      ></iframe>
    </div>
  </div>
);

export default WeatherCard;
