import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";
import { WeatherData, WeatherError } from "./types/types";
import { weatherCodes } from "./types/utils/weatherCodes";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function isWeatherError(
    response: WeatherData | WeatherError
  ): response is WeatherError {
    return (response as WeatherError).error !== undefined;
  }

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

            // error handling
            if (isWeatherError(response)) {
              setError(response.reason);
              return;
            }

            setWeatherData(response as WeatherData);
            setIsLoading(false);
          }
          fetchData();
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  const dailyWeather = weatherData?.daily;
  //   const hourlyWeather = weatherData?.hourly;

  const todaysWeatherCodefromApi = dailyWeather?.weatherCode[1];
  const todaysWeatherIcon = weatherCodes.find(
    (codeSet) => codeSet.code === todaysWeatherCodefromApi
  )?.imagePath;

  if (error) {
    return (
      <main>
        <div id="current" className="text-center ">
          <img src="/weather-icons/sad-sun-80.png" className="gentle-bounce" />
          <p className="text-red-950 font-semibold text-2xl">{error}</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <div id="current" className="text-center ">
          <img src="/weather-icons/sun-80.png" className="logo" />
          <p className=" font-semibold text-2xl">loading</p>
        </div>
      </main>
    );
  }

  if (weatherData)
    return (
      <main>
        {/* Current Weather */}
        <div
          id="current"
          className="text-center relative flex gap-4 items-center"
        >
          <img src={todaysWeatherIcon} className="" />
          <h2 className="text-blue-950 text-8xl font-extrabold ">
            {weatherData?.current.temperature2m.toFixed(0)}
            <span className="font-extralight mb-auto">°</span>
          </h2>
          {/* <p className="text-blue-900 font-semibold text-xl"></p> */}
        </div>
      </main>
    );
}

export default App;
