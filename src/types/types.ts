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

export type WeatherCode = {
  code: number;
  description: string;
  imagePath: string;
};

export type WeatherError = {
  error: boolean;
  reason: string;
};
