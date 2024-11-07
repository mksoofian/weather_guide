import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";
import { WeatherData } from "./types/types";
import { weatherCodes } from "./types/utils/weatherCodes";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // for testing purposes

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords.latitude && position.coords.longitude) {
          async function fetchData() {
            const response = await fetchWeather(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(response);
            // setIsLoading(false);
          }
          fetchData();
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const dailyWeather = weatherData?.daily;
  //   const hourlyWeather = weatherData?.hourly;

  const todaysWeatherCodefromApi = dailyWeather?.weatherCode[1];
  const todaysWeatherIcon = weatherCodes.find(
    (codeSet) => codeSet.code === todaysWeatherCodefromApi
  )?.imagePath;

  if (isLoading) {
    return (
      <main>
        {/* Current Weather */}
        <div id="current" className="text-center ">
          <img src="/weather-icons/sun-80.png" className="logo" />
          <p className=" font-semibold text-2xl">loading</p>
        </div>
      </main>
    );
  }

  //   if (error){}

  if (weatherData)
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
