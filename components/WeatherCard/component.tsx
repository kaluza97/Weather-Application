import React, {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './styles';
import {Props} from './types';
import {WeatherDataInterface} from '../WeatherSearchForm/types';
import {white} from '../../variables/global.styles';

const WeatherCard: FC<Props> = ({weatherData}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<{Details: {weatherData: WeatherDataInterface}}>
    >();

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Nie znaleziono danych pogodowych</Text>
      </View>
    );
  }

  const imageUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  const handlePress = (): void => {
    navigation.navigate('Details', {weatherData});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Icon name="map-marker" size={26} color={white} />
            <Text style={styles.city}>{weatherData.name}</Text>
          </View>
          <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
        </View>
        <View>
          <Image
            source={{
              uri: imageUrl,
              width: 100,
              height: 100,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherCard;
