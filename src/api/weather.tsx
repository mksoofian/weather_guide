import { fetchWeatherApi } from "openmeteo";

export default async function fetchWeather(
  latitude: number,
  longitude: number
) {
  // FROM OPEN-METEO DOCS
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: ["temperature_2m", "apparent_temperature", "is_day"],
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
    ],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "America/New_York",
    past_days: 1,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      apparentTemperature: current.variables(1)!.value(),
      isDay: current.variables(2)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      apparentTemperature: hourly.variables(1)!.valuesArray()!,
      precipitationProbability: hourly.variables(2)!.valuesArray()!,
      precipitation: hourly.variables(3)!.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
    },
  };
  return weatherData;
  //   console.log(weatherData);
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  //   for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //     console.log(
  //       weatherData.hourly.time[i].toISOString(),
  //       weatherData.hourly.temperature2m[i],
  //       weatherData.hourly.apparentTemperature[i],
  //       weatherData.hourly.precipitationProbability[i],
  //       weatherData.hourly.precipitation[i]
  //     );
  //   }
  //   for (let i = 0; i < weatherData.daily.time.length; i++) {
  //     console.log(
  //       weatherData.daily.time[i].toISOString(),
  //       weatherData.daily.weatherCode[i],
  //       weatherData.daily.temperature2mMax[i],
  //       weatherData.daily.temperature2mMin[i]
  //     );
  //   }
}
