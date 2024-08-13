import { FC, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import WeatherForm from '../../components/WeatherSearchForm/component';
import { styles } from './styles';
import WeatherCard from '../../components/Cards/WeatherCard/component';
import { WeatherDataInterface } from '../../components/WeatherSearchForm/types';
import FavoriteCard from '../../components/Cards/FavoriteCard/component';
import { colors } from '../../variables/global.styles';

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
