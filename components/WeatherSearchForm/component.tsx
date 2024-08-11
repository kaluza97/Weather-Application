import React, {FC, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {inputPlaceholderColor} from '../../variables/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {weatherDataSchema, WeatherFormProps} from './types';

const WeatherSearchForm: FC<WeatherFormProps> = ({onWeatherData}) => {
  const [city, setCity] = useState<string>('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
      );
      const data = await response.json();
      const safeData = weatherDataSchema.safeParse(data);
      if (safeData.success) {
        onWeatherData(safeData.data);
      } else {
        // fallback if lack of data
        onWeatherData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Wyszukaj miasto"
          value={city}
          onChangeText={setCity}
          style={styles.searchInput}
          placeholderTextColor={inputPlaceholderColor}
        />
        <TouchableOpacity onPress={fetchWeather} style={styles.searchButton}>
          <Icon name="search" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeatherSearchForm;
