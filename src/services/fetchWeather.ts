import { Alert } from 'react-native';
import {
  WeatherDataInterface,
  weatherDataSchema,
} from '@components/WeatherSearchForm/types';

export const fetchWeatherByCityName = async (
  city: string,
): Promise<WeatherDataInterface | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );

    const data = await response.json();
    const safeData = weatherDataSchema.safeParse(data);
    if (safeData.success) {
      return safeData.data;
    } else {
      return data;
    }
  } catch (error) {
    Alert.alert(
      'Przepraszamy!',
      'Wystąpił błąd podczas pobierania danych pogodowych.',
      [{ text: 'OK' }],
    );
    return null;
  }
};

export const fetchWeatherById = async (
  cityId: number,
): Promise<WeatherDataInterface | null> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    Alert.alert(
      'Przepraszamy!',
      'Wyszukiwanie przebiegło nieprawidłowo. Spróbuj ponownie później.',
      [{ text: 'OK' }],
    );
    return null;
  }
  const data = await response.json();
  const safeData = weatherDataSchema.safeParse(data);
  if (safeData.success) {
    return safeData.data;
  } else {
    return data;
  }
};

export const fetchWeatherByIdsList = async (
  idList: Array<number>,
): Promise<Array<WeatherDataInterface>> => {
  try {
    const arrayOfPromises = idList.map(fetchWeatherById);
    const weatherData = await Promise.all(arrayOfPromises);
    const filteredData = weatherData.filter(data => data !== null);
    return filteredData;
  } catch (error) {
    Alert.alert(
      'Przepraszamy!',
      'Wystąpił błąd podczas pobierania danych pogodowych.',
      [{ text: 'OK' }],
    );
    return [];
  }
};