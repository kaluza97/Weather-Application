import React, { FC, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WeatherFormProps } from '@components/WeatherSearchForm/types';
import { fetchWeather } from '@services/fetchWeather';
import { styles } from '@components/WeatherSearchForm/styles';
import { colors } from '@constants/global.styles';

const WeatherSearchForm: FC<WeatherFormProps> = ({ onWeatherData }) => {
  const [cityName, setCityName] = useState<string>('');

  const handleFetchWeather = () => {
    if (cityName) {
      fetchWeather(cityName, onWeatherData);
    } else {
      onWeatherData(null);
    }
  };

  const handleClear = () => {
    setCityName('');
    onWeatherData(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Wyszukaj miasto"
          value={cityName}
          onChangeText={setCityName}
          style={styles.searchInput}
          placeholderTextColor={colors.inputPlaceholderColor}
        />
        <TouchableOpacity
          onPress={handleFetchWeather}
          style={styles.touchableOpacity}>
          <Icon name="search" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear} style={styles.touchableOpacity}>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeatherSearchForm;
