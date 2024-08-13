import {
  WeatherDataInterface,
  weatherDataSchema,
} from '../components/WeatherSearchForm/types';

export const fetchWeather = async (
  city: string,
  onWeatherData: (data: WeatherDataInterface) => void,
): Promise<void | null> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    console.error('Wyszukiwanie przebiegło nieprawidłowo');
    return null;
  }
  const data = await response.json();
  const safeData = weatherDataSchema.safeParse(data);
  if (safeData.success) {
    onWeatherData(safeData.data);
  } else {
    // fallback if lack of data
    onWeatherData(data);
  }
};

export const fetchWeatherById = async (
  cityId: number,
): Promise<WeatherDataInterface | null> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    console.error('Wyszukiwanie przebiegło nieprawidłowo');
    return null;
  }
  const data = await response.json();
  const safeData = weatherDataSchema.safeParse(data);
  if (safeData.success) {
    return safeData.data;
  } else {
    // fallback if lack of data
    return data;
  }
};
