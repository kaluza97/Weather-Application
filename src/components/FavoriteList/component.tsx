import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedCard from '@components/Cards/AnimatedCard/component';
import {WeatherDataInterface} from '@components/WeatherSearchForm/types';
import {fetchWeatherById, fetchWeatherByIdsList} from '@services/fetchWeather';
import {getFavorites, removeFavorite} from '@utils/favoriteUtils';
import {styles} from '@components/FavoriteList/styles';

const FavoriteList: FC = () => {
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
    fetchWeatherByIdsList(favoritesIdList, setFavoritesData);
  }, [favoritesIdList, fetchWeatherById]);

  const handleRemove = async (id: number) => {
    await removeFavorite(id);
    setFavoritesData(prevData => prevData.filter(item => item.id !== id));
    setFavoritesIdList(prevList => prevList.filter(itemId => itemId !== id));
  };

  const renderFavoriteItem = ({item}: {item: WeatherDataInterface}) => (
    <AnimatedCard item={item} onRemove={handleRemove} />
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

export default FavoriteList;
