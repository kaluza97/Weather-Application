import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { Props } from '../types';
import { WeatherDataInterface } from '../../WeatherSearchForm/types';
import { white } from '../../../variables/global.styles';

const WeatherCard: FC<Props> = ({ weatherData }) => {
    const navigation = useNavigation<NativeStackNavigationProp<{ Details: { weatherData: WeatherDataInterface } }>>();

    const handlePress = (): void => {
        console.log(weatherData, 'hahahahah')
        navigation.navigate('Details', { weatherData });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.touchableOpacity}>
                <View>
                    <View style={styles.header}>
                        <Icon name="map-marker" size={26} color={white} />
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