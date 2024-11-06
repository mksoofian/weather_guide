import fetchWeather from "./api/weather";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

  if (userLocation)
    console.log(fetchWeather(userLocation.latitude, userLocation.longitude));

  return (
    <>
      <div>
        <h1>Hi</h1>
      </div>
    </>
  );
}

export default App;
