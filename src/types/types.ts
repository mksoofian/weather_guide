export type WeatherData = {
  current: {
    time: Date;
    temperature2m: number;
    apparentTemperature: number;
    isDay: number;
    weatherCode: number;
  };
};

export type WeatherCode = {
  code: number;
  description: string;
  imagePath: string;
};

export type WeatherError = {
  error: boolean;
  reason: string;
};
