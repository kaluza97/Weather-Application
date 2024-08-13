import {Alert} from 'react-native';
import {
  WeatherDataInterface,
  weatherDataSchema,
} from '@components/WeatherSearchForm/types';

export const fetchWeatherByCityName = async (
  city: string,
  dataSetter: (data: WeatherDataInterface) => void,
): Promise<void | null> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
  );

  if (!response.ok) {
    Alert.alert(
      'Przepraszamy!',
      'Wyszukiwanie przebiegło nieprawidłowo. Spróbuj ponownie później.',
      [{text: 'OK'}],
    );
    return null;
  }
  const data = await response.json();
  console.log(data);
  const safeData = weatherDataSchema.safeParse(data);
  if (safeData.success) {
    dataSetter(safeData.data);
  } else {
    // fallback if lack of data
    dataSetter(data);
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
      [{text: 'OK'}],
    );
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

export const fetchWeatherByIdsList = async (
  idList: Array<number>,
  dataSetter: (data: Array<WeatherDataInterface>) => void,
) => {
  try {
    const arrayOfPromises = idList.map(fetchWeatherById);
    const weatherData = await Promise.all(arrayOfPromises);
    dataSetter(weatherData.filter(data => data !== null));
  } catch (error) {
    Alert.alert(
      'Przepraszamy!',
      'Wystąpił błąd podczas pobierania danych pogodowych.',
      [{text: 'OK'}],
    );
  }
};
