import React, { FC } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
import { primaryColor } from '../../variables/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import { Props } from './types';

const DetailsScreen: FC<Props> = ({ route }) => {
    const { weatherData } = route.params;
    const currentDate = new Date().toLocaleDateString();

    if (!weatherData) {
        return (
            <View style={styles.container}>
                <Text style={styles.cityName}>Nie znaleziono danych pogodowych</Text>
            </View>
        );
    }

    const onPress = () => {
        console.log('Dodano do ulubionych');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
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
                        <Icon name="calendar-o" size={28} style={styles.icon} />
                        <Text style={styles.detailText}>{currentDate}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="thermometer" size={28} style={styles.icon} />
                        <Text style={styles.detailText}>
                            Max temperatura: {weatherData.main.temp_max}°C
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="leaf" size={28} style={styles.icon} />
                        <Text style={styles.detailText}>
                            Wiatr: {weatherData.wind.speed} m/s
                        </Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="tint" size={28} style={styles.icon} />
                        <Text style={styles.detailText}>
                            Wilgotność: {weatherData.main.humidity}%
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text style={styles.buttonText}>Dodaj do ulubionych</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailsScreen;
