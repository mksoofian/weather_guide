import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";
import { WeatherData } from "./types/types";
import { weatherCodes } from "./types/utils/weatherCodes";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //   function isWeatherError(
  //     response: WeatherData | WeatherError
  //   ): response is WeatherError {
  //     return (response as WeatherError).error !== undefined;
  //   }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          if (position.coords.latitude && position.coords.longitude) {
            async function fetchData() {
              const response = await fetchWeather(
                position.coords.latitude,
                position.coords.longitude
              );
              console.log(response);
              // error handling for fetch
              //   if (isWeatherError(response)) {
              //     setError(response.reason);
              //     return;
              //   }

              setWeatherData(response as WeatherData);
              setIsLoading(false);
            }
            fetchData();
          }
        },
        function error(err) {
          // error handling for getCurrentPosition
          setError(`ERROR(${err.code}): ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  const todaysWeatherIcon = weatherCodes.find(
    (codeSet) => codeSet.code === weatherData?.current.weatherCode
  )?.imagePath;

  if (error) {
    return (
      <main>
        <div id="current" className="text-center ">
          <img
            src="/weather-icons/sad-sun-80.png"
            className="gentle-bounce-down"
          />
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

  return (
    <main>
      {/* Current Weather */}
      <div
        id="current"
        className="text-center relative flex gap-4 items-center"
      >
        <img src={todaysWeatherIcon} className="gentle-scale-up" />
        <div className="flex justify-center align-top gap-2">
          {" "}
          <h2 className="text-blue-950 text-8xl font-extrabold ">
            {weatherData?.current.temperature2m.toFixed(0)}
          </h2>{" "}
          <p className="text-3xl font-normal pt-2">°F</p>
        </div>
      </div>
    </main>
  );
}

export default App;
