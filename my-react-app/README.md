# 🌦️ WeatherNow

A responsive, professional-grade weather web application built with **React + Vite** and styled using **Bootstrap 5**. This app allows users to search any city and view real-time weather details using the **OpenWeatherMap API**, with a clean UI, smooth theme transitions, and responsive design.

---

## 🚀 Features

- 🔍 **City Search:** Enter any city to view current weather.
- 🌡️ **Weather Details:** View temperature, humidity, condition, and icon.
- 🧭 **Dynamic Routing:** Clean route structure with `react-router-dom`
  - `/` – Home page with search bar
  - `/weather/:city` – Weather details page
  - `*` – Custom 404 page
- 🌙 **Light/Dark Mode Toggle:** With smooth transitions and localStorage persistence.
- 📱 **Fully Responsive:** Built with Bootstrap 5 components (Navbar, Cards, Buttons, etc.)
- 🗺️ **Google Map Embed:** Shows city location (optional).
- ⚠️ **Error Handling:** City not found and API error feedback.
- 💾 **Bonus (optional):** Recent search history stored in `localStorage`.

---

## 🧱 Tech Stack

| Tech            | Usage                                  |
|-----------------|----------------------------------------|
| React + Vite    | Frontend app setup                     |
| Bootstrap 5     | Responsive styling                     |
| OpenWeatherMap  | Weather data via public API            |
| React Router DOM| Routing between pages                  |
| CSS Variables   | Theme management (light/dark)          |

---

## 🔧 Installation

# 1. Clone the repository
git clone [https://github.com/yourusername/weathernow.git](https://github.com/mrpawarGit/weathernow.git)

# 2. Install dependencies
npm install

# 3. Create .env file with your OpenWeatherMap API key
echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env

# 4. Start the app
npm run dev

## 🌐 API Reference
This app uses the OpenWeatherMap Current Weather Data API.

# Example Endpoint:
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
Docs: https://openweathermap.org/current

## 🙌 Acknowledgements
- React
- Vite
- OpenWeatherMap API
- Bootstrap 5
