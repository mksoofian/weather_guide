import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";
import { WeatherData } from "./types/types";

function App() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        setUserLocation({
          latitude: userLatitude,
          longitude: userLongitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const response = fetchWeather(
        userLocation.latitude,
        userLocation.longitude
      );
      response
        .then((data) => setWeatherData(data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLocation]);
  console.log(weatherData);

  return (
    <>
      {/* Current Weather */}
      <div>
        <h2>{weatherData?.current.temperature2m.toFixed(0)}</h2>
        <p>
          but it feels like{" "}
          {weatherData?.current.apparentTemperature.toFixed(0)}
        </p>
      </div>
    </>
  );
}

export default App;
