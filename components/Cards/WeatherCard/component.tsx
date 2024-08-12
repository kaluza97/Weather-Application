import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WeatherDataInterface } from '../../WeatherSearchForm/types';
import { styles } from '../styles';
import { Props } from '../types';

const WeatherCard: FC<Props> = ({ weatherData }) => {
    const navigation = useNavigation<NativeStackNavigationProp<{ Details: { weatherData: WeatherDataInterface } }>>();

    const handlePress = (): void => {
        navigation.navigate('Details', { weatherData });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.touchableOpacity}>
                <View>
                    <View style={styles.header}>
                        <Icon name="map-marker" style={styles.icon} />
                        <Text style={styles.city}>{weatherData.name}</Text>
                    </View>
                    <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                    <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
                </View>
                <Image
                    source={{
                        uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                        width: 100,
                        height: 100,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default WeatherCard;