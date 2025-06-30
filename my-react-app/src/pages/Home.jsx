import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city.trim()}`);
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4">Search City Weather</h1>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default Home;
