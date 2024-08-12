import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WeatherDataInterface } from '../../WeatherSearchForm/types';
import { white } from '../../../variables/global.styles';
import { getFavorites } from '../../../utils/favoriteUtils';
import { styles } from '../styles';
import { fetchWeatherById } from '../../../services/fetchWeather';

const FavoriteCard: FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<{ Details: { weatherData: WeatherDataInterface } }>>();
    const [favoritesData, setFavoritesData] = useState<Array<WeatherDataInterface>>([]);
    const [favoritesIdList, setFavoritesIdList] = useState<Array<number>>([]);

    useFocusEffect(
        useCallback(() => {
            const getFavoritesFunction = async () => {
                const fetchedFavorites = await getFavorites();
                setFavoritesIdList(fetchedFavorites);
            };
            getFavoritesFunction();
        }, [])
    );

    useEffect(() => {
        if (favoritesIdList.length === 0) return;

        const fetchWeatherData = async () => {
            try {
                const weatherData = await Promise.all(favoritesIdList.map(fetchWeatherById));
                setFavoritesData(weatherData.filter(Boolean) as Array<WeatherDataInterface>);
            } catch (error) {
                console.error('Błąd pobierania danych pogodowych:', error);
            }
        };

        fetchWeatherData();
    }, [favoritesIdList, fetchWeatherById]);


    const handlePress = (item: WeatherDataInterface): void => {
        console.log(item)
        navigation.navigate('Details', { weatherData: item });
    };

    const renderFavoriteItem = ({ item }: { item: WeatherDataInterface }) => (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.touchableOpacity}>
                <View>
                    <View style={styles.header}>
                        <Icon name="map-marker" size={26} color={white} />
                        <Text style={styles.city}>{item.name}</Text>
                    </View>
                    <Text style={styles.description}>{item.weather[0].description}</Text>
                    <Text style={styles.temperature}>{item.main.temp}°C</Text>
                </View>
                <Image
                    source={{
                        uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                        width: 100,
                        height: 100,
                    }}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {favoritesData.length > 0 ? (
                <FlatList
                    data={favoritesData}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                />
            ) : (
                <Text style={styles.noFavorites}>Brak ulubionych miast</Text>
            )}
        </View>
    );
};

export default FavoriteCard;
