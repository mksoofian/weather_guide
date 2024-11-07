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

  return (
    <>
      <div>
        <h1>Hi</h1>
      </div>
    </>
  );
}

export default App;
