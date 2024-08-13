import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../variables/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFavorites, toggleFavorite } from '../../utils/favoriteUtils';
import { styles } from './styles';
import { Props } from './types';

const DetailsScreen: FC<Props> = ({ route }) => {
  const { weatherData } = route.params;
  const currentDate: string = new Date().toLocaleDateString();
  const [isAddedToFavorite, setIsAddedToFavorite] = useState<Array<number>>([]);

  useEffect(() => {
    const getFavoritesFunction = async () => {
      const favorites = await getFavorites();
      setIsAddedToFavorite(favorites);
    };
    getFavoritesFunction();
  }, []);

  const onPress = async (): Promise<void> => {
    const updatedFavorites = await toggleFavorite(
      isAddedToFavorite,
      weatherData.id,
    );
    setIsAddedToFavorite(updatedFavorites);
  };

  const getButtonText = (): string =>
    isAddedToFavorite.includes(weatherData.id)
      ? 'Usuń z ulubionych'
      : 'Dodaj do ulubionych';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {weatherData ? (
          <>
            <View style={styles.header}>
              <View style={styles.rowContainer}>
                <Text style={styles.cityName}>{weatherData.name}</Text>
                <Icon name="map-marker" style={styles.markerIcon} />
              </View>
              <Text style={styles.currentTemp}>
                {Math.round(weatherData.main.temp)}
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
                }}
                style={styles.weatherIcon}
              />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.rowContainer}>
                <Icon name="calendar-o" style={styles.icon} />
                <Text style={styles.detailText}>{currentDate}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="thermometer" style={styles.icon} />
                <Text style={styles.detailText}>
                  Max temperatura: {weatherData.main.temp_max}°C
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="leaf" style={styles.icon} />
                <Text style={styles.detailText}>
                  Wiatr: {weatherData.wind.speed} m/s
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="tint" style={styles.icon} />
                <Text style={styles.detailText}>
                  Wilgotność: {weatherData.main.humidity}%
                </Text>
              </View>
              <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>{getButtonText()}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <Text style={styles.cityName}>
              Nie znaleziono danych pogodowych
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
