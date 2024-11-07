export type WeatherData = {
  current: {
    time: Date;
    temperature2m: number;
    apparentTemperature: number;
    isDay: number;
  };
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
    apparentTemperature: Float32Array;
    precipitationProbability: Float32Array;
    precipitation: Float32Array;
  };
  daily: {
    time: Date[];
    temperature2mMax: Float32Array;
    temperature2mMin: Float32Array;
    weatherCode: Float32Array;
  };
};

type WeatherCode = {
  code: number;
  description: string;
};

export const weatherCodes: WeatherCode[] = [
  { code: 0, description: "Clear sky" },
  { code: 1, description: "Mainly clear, partly cloudy, and overcast" },
  { code: 2, description: "Mainly clear, partly cloudy, and overcast" },
  { code: 3, description: "Mainly clear, partly cloudy, and overcast" },
  { code: 45, description: "Fog and depositing rime fog" },
  { code: 48, description: "Fog and depositing rime fog" },
  { code: 51, description: "Drizzle: Light, moderate, and dense intensity" },
  { code: 53, description: "Drizzle: Light, moderate, and dense intensity" },
  { code: 55, description: "Drizzle: Light, moderate, and dense intensity" },
  { code: 56, description: "Freezing Drizzle: Light and dense intensity" },
  { code: 57, description: "Freezing Drizzle: Light and dense intensity" },
  { code: 61, description: "Rain: Slight, moderate and heavy intensity" },
  { code: 63, description: "Rain: Slight, moderate and heavy intensity" },
  { code: 65, description: "Rain: Slight, moderate and heavy intensity" },
  { code: 66, description: "Freezing Rain: Light and heavy intensity" },
  { code: 67, description: "Freezing Rain: Light and heavy intensity" },
  { code: 71, description: "Snow fall: Slight, moderate, and heavy intensity" },
  { code: 73, description: "Snow fall: Slight, moderate, and heavy intensity" },
  { code: 75, description: "Snow fall: Slight, moderate, and heavy intensity" },
  { code: 77, description: "Snow grains" },
  { code: 80, description: "Rain showers: Slight, moderate, and violent" },
  { code: 81, description: "Rain showers: Slight, moderate, and violent" },
  { code: 82, description: "Rain showers: Slight, moderate, and violent" },
  { code: 85, description: "Snow showers slight and heavy" },
  { code: 86, description: "Snow showers slight and heavy" },
  { code: 95, description: "Thunderstorm: Slight or moderate" },
  { code: 96, description: "Thunderstorm with slight and heavy hail" },
  { code: 99, description: "Thunderstorm with slight and heavy hail" },
];
