import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WeatherDetails from "./pages/WeatherDetails";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container-fluid my-4 flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);

export default App;
