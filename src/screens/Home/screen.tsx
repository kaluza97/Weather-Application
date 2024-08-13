import {FC, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import StaticCard from '@components/Cards/StaticCard/component';
import FavoriteList from '@components/FavoriteList/component';
import WeatherForm from '@components/WeatherSearchForm/component';
import {WeatherDataInterface} from '@components/WeatherSearchForm/types';
import {colors} from '@constants/global.styles';
import {styles} from './styles';

const HomeScreen: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataInterface | null>(
    null,
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeatherForm onWeatherData={setWeatherData} />
        {weatherData ? (
          <StaticCard weatherData={weatherData} />
        ) : (
          <FavoriteList />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
