import {FC, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import WeatherForm from '../../components/WeatherSearchForm/component';
import {black} from '../../variables/global.styles';
import {styles} from './styles';
import WeatherCard from '../../components/WeatherCard/component';
import {WeatherDataInterface} from '../../components/WeatherSearchForm/types';

const HomeScreen: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataInterface | null>(
    null,
  );

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor={black} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeatherForm onWeatherData={setWeatherData} />
        <WeatherCard weatherData={weatherData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
