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

// Conversion of type
// '{ current: { time: Date; temperature2m: number; apparentTemperature: number; isDay: number; };
//    hourly: { time: Date[]; temperature2m: Float32Array; apparentTemperature: Float32Array; precipitationProbability: Float32Array; precipitation: Float32Array; };
//    daily: { ...; }; }'
// to type 'WeatherData' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//   Types of property 'daily' are incompatible.
//     Type '{ time: Date[]; weatherCode: Float32Array; temperature2mMax: Float32Array; temperature2mMin: Float32Array; }' is missing the following properties from type '{ time: Date; temperature2m: Float32Array; temperature2mMax: Float32Array; temperature2mMin: Float32Array; precipitationProbability: Float32Array; }': temperature2m, precipitationProbabilityts(2352)
