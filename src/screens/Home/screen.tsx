import { FC, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import WeatherCard from '@components/Cards/WeatherCard/component';
import FavoriteCard from '@components/Cards/FavoriteCard/component';
import WeatherForm from '@components/WeatherSearchForm/component';
import { WeatherDataInterface } from '@components/WeatherSearchForm/types';
import { colors } from '@constants/global.styles';
import { styles } from './styles';

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
          <WeatherCard weatherData={weatherData} />
        ) : (
          <FavoriteCard />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
