import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { WeatherDataInterface } from '../../WeatherSearchForm/types';
import { getFavorites, removeFavorite } from '../../../utils/favoriteUtils';
import { styles } from '../styles';
import { fetchWeatherById } from '../../../services/fetchWeather';
import SwipeableItem from '../SwipeableItem/component';

const FavoriteCard: FC = () => {
  const [favoritesData, setFavoritesData] = useState<
    Array<WeatherDataInterface>
  >([]);
  const [favoritesIdList, setFavoritesIdList] = useState<Array<number>>([]);

  useFocusEffect(
    useCallback(() => {
      const getFavoritesFunction = async () => {
        const fetchedFavorites = await getFavorites();
        setFavoritesIdList(fetchedFavorites);
      };
      getFavoritesFunction();
    }, []),
  );

  useEffect(() => {
    if (favoritesIdList.length === 0) return;

    const fetchWeatherData = async () => {
      try {
        const arrayOfPromises = favoritesIdList.map(fetchWeatherById);
        const weatherData = await Promise.all(arrayOfPromises);
        setFavoritesData(
          weatherData.filter(data => data !== null)
        );
      } catch (error) {
        Alert.alert("Przepraszamy!", 'Wystąpił błąd podczas pobierania danych pogodowych.', [
          { text: "OK" }
        ])
      }
    };

    fetchWeatherData();
  }, [favoritesIdList, fetchWeatherById]);

  const handleRemove = async (id: number) => {
    await removeFavorite(id);
    setFavoritesData(prevData => prevData.filter(item => item.id !== id));
    setFavoritesIdList(prevList => prevList.filter(itemId => itemId !== id));
  };

  const renderFavoriteItem = ({ item }: { item: WeatherDataInterface }) => (
    <SwipeableItem item={item} onRemove={handleRemove} />
  );

  return (
    <View>
      {favoritesData.length > 0 ? (
        <FlatList
          data={favoritesData}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noFavorites}>Brak ulubionych miast</Text>
      )}
    </View>
  );
};

export default FavoriteCard;
