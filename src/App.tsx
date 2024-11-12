import "./App.css";
import fetchWeather from "./api/weather";
import { useEffect, useState } from "react";
import { GeoLocation } from "./types/types";
import { weatherCodes } from "./types/utils/weatherCodes";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherPage />
    </QueryClientProvider>
  );
}

const fetchWeatherData = async function fetchData(coordinates: GeoLocation) {
  const response = await fetchWeather(coordinates);
  // Error handling with Type Narrowing depending on whether API returns an error object or data object
  if ("error" in response) {
    throw new Error(`Error: ${response.reason}`);
  } else {
    return response;
  }
};

function WeatherPage() {
  const [coordinates, setCoordinates] = useState<GeoLocation | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          if (position.coords.latitude && position.coords.longitude) {
            const userCoordinates: GeoLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            // async function fetchData() {
            //   const response = await fetchWeather(
            //     position.coords.latitude,
            //     position.coords.longitude
            //   );

            //   // Error handling with Type Narrowing depending on whether API returns an error object or data object
            //   if ("error" in response) {
            //     setError(`Error: ${response.reason}`);
            //   } else {
            //     setWeatherData(response);
            //   }
            // }
            // const {data, isLoading, error} = useQuery({queryKey:[], queryFn: fetchData})

            // fetchData();
            setCoordinates(userCoordinates);
            console.log(userCoordinates);
          }
        },
        function error(err) {
          // error handling for getCurrentPosition
          throw new Error(`ERROR(${err.code}): ${err.message}`);
        }
      );
    } else {
      throw new Error("Geolocation is not supported by this browser.");
    }
  }, []);

  const {
    data: rcvdWeatherData,
    isLoading: isLoadingWeatherData,
    error: rcvdWeatherDataError,
  } = useQuery({
    queryKey: ["weatherData", coordinates],
    queryFn: () => fetchWeatherData(coordinates!),
    enabled: !!coordinates,
  });

  const todaysWeatherIcon = weatherCodes.find(
    (codeSet) => codeSet.code === rcvdWeatherData?.current.weatherCode
  )?.imagePath;

  if (rcvdWeatherDataError) {
    return (
      <main>
        <div id="current" className="text-center ">
          <img
            src="/weather-icons/sad-sun-80.png"
            className="gentle-bounce-down"
          />
          <p className="text-red-950 font-semibold text-2xl">
            {rcvdWeatherDataError.message}
          </p>
        </div>
      </main>
    );
  }

  if (isLoadingWeatherData) {
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
            {rcvdWeatherData?.current.temperature2m.toFixed(0)}
          </h2>{" "}
          <p className="text-3xl font-normal pt-2">°F</p>
        </div>
      </div>
    </main>
  );
}
