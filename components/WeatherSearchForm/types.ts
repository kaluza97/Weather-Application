import {z} from 'zod';

enum WeatherDescriptions {
  ClearSky = 'clear sky',
  FewClouds = 'few clouds',
  ScatteredClouds = 'scattered clouds',
  BrokenClouds = 'broken clouds',
  ShowerRain = 'shower rain',
  Rain = 'rain',
  Thunderstorm = 'thunderstorm',
  Snow = 'snow',
  Mist = 'mist',
}

enum WeatherIcons {
  ClearSkyDay = '01d',
  ClearSkyNight = '01n',
  FewCloudsDay = '02d',
  FewCloudsNight = '02n',
  ScatteredCloudsDay = '03d',
  ScatteredCloudsNight = '03n',
  BrokenCloudsDay = '04d',
  BrokenCloudsNight = '04n',
  ShowerRainDay = '09d',
  ShowerRainNight = '09n',
  RainDay = '10d',
  RainNight = '10n',
  ThunderstormDay = '11d',
  ThunderstormNight = '11n',
  SnowDay = '13d',
  SnowNight = '13n',
  MistDay = '50d',
  MistNight = '50n',
}

export const weatherDataSchema = z.object({
  base: z.string(),
  clouds: z.object({all: z.number()}),
  cod: z.number(),
  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  dt: z.number(),
  id: z.number(),
  main: z.object({
    feels_like: z.number(),
    grnd_level: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    sea_leavel: z.number().optional(),
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  name: z.string(),
  sys: z.object({
    country: z.string(),
    id: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    type: z.number(),
  }),
  timezone: z.number(),
  visibility: z.number(),
  weather: z.array(
    z.object({
      description: z.nativeEnum(WeatherDescriptions),
      icon: z.nativeEnum(WeatherIcons),
      id: z.number(),
      main: z.string(),
    }),
  ),
  wind: z.object({
    deg: z.number(),
    gust: z.number().optional(),
    speed: z.number(),
  }),
});
export type WeatherDataInterface = z.infer<typeof weatherDataSchema>;

export interface WeatherFormProps {
  onWeatherData: (data: WeatherDataInterface | null) => void;
}
