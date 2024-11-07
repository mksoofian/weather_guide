import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";
import { weatherCodes, WeatherData } from "./types/types";

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

  const dailyWeather = weatherData?.daily;
  //   const hourlyWeather = weatherData?.hourly;

  const todaysWeatherCodefromApi = dailyWeather?.weatherCode[1];
  const todaysWeatherIcon = weatherCodes.find(
    (code) => code.code === todaysWeatherCodefromApi
  )?.imagePath;

  return (
    <main>
      {/* Current Weather */}
      <div id="current" className="text-center ">
        <img src={todaysWeatherIcon} />
        <h2 className="text-blue-950 text-9xl font-extrabold">
          {weatherData?.current.temperature2m.toFixed(0)}
        </h2>
        <p className="text-blue-900 font-semibold text-xl">
          but it feels like{" "}
          {weatherData?.current.apparentTemperature.toFixed(0)}
        </p>
      </div>
    </main>
  );
}

export default App;
