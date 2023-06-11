import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null); // State variable for error message

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await fetchWeather(query);
        setWeather(data);
        setError(null); // Clear the error message if present
        setQuery("");
      } catch (error) {
        setError("City not found. Please try a valid city name."); // Set the error message for any other error
        setQuery("");
      }
    }
  };

  return (
    <>
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />

        {Object.keys(weather).length > 0 && !error ? ( // Check if weather data is present and no error
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>

            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>

            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <div className="error">{error}</div> // Display the error message if present
        )}
      </div>
    </>
  );
}

export default App;
