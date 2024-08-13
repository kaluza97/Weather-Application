import {
  WeatherDataInterface,
  WeatherDescriptions,
  WeatherIcons,
} from '@components/WeatherSearchForm/types';

export const mockWeatherData: WeatherDataInterface = {
  base: 'stations',
  clouds: {all: 0},
  cod: 200,
  coord: {lat: 51.1, lon: 17.0333},
  dt: 1723573262,
  id: 3081368,
  main: {
    feels_like: 24.08,
    grnd_level: 998,
    humidity: 47,
    pressure: 1013,
    temp: 24.36,
    temp_max: 24.95,
    temp_min: 23.37,
  },
  name: 'Wrocław',
  sys: {
    country: 'PL',
    id: 2006601,
    sunrise: 1723520156,
    sunset: 1723573058,
    type: 2,
  },
  timezone: 7200,
  visibility: 10000,
  weather: [
    {
      description: WeatherDescriptions.ClearSky,
      icon: WeatherIcons.ClearSkyDay,
      id: 800,
      main: 'Clear',
    },
  ],
  wind: {deg: 70, speed: 3.09},
};
