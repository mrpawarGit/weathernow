# 🌦️ WeatherNow

A responsive, professional-grade weather web application built with **React + Vite** and styled using **Bootstrap 5**. This app allows users to search any city and view real-time weather details using the **OpenWeatherMap API**, with a clean UI, smooth theme transitions, and a responsive design.

---
## Live Site - [WeatherNow](https://weathernow-reactapp.netlify.app/)
---
<img width="1905" height="959" alt="image" src="https://github.com/user-attachments/assets/218b7f69-efec-418e-b06e-84db5b8ef955" />
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
```
git clone https://github.com/mrpawarGit/weathernow.git
cd my-react-app
```
# 2. Install dependencies
```
npm install
```
# 3. Create .env file with your OpenWeatherMap API key
```
VITE_WEATHER_API_KEY=your_api_key_here"
```

# 4. Start the app
```
npm run dev
```

## 🗂️ Project Structure
```
src/
│
├── components/          # Theme Toggle, Footer, etc.
│   ├── Footer.css
│   └── Footer.jsx
│   └── Header.css
│   └── Header.jsx
│   └── WeatherCard.css
│   └── WeatherCard.jsx
│
├── pages/               # Route-based pages
│   ├── Home.jsx
│   ├── WeatherDetails.jsx
│   └── NotFound.jsx
│
├── styles/
│   └── theme.css        # Custom theme and transitions
│
├── App.jsx              # Main layout and routing
├── main.jsx             # React root
└── ...
```
## 🌐 API Reference
- This app uses the [**OpenWeatherMap**](https://openweathermap.org/api) Current Weather Data API.

## 🙌 Acknowledgements
- React
- Vite
- OpenWeatherMap API
- Bootstrap 5
