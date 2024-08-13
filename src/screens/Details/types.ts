import {RouteProp} from '@react-navigation/native';
import {WeatherDataInterface} from '@components/WeatherSearchForm/types';

export type RootStackParamList = {
  Home: undefined;
  Details: {weatherData: WeatherDataInterface};
};

export type Props = {
  route: RouteProp<RootStackParamList, 'Details'>;
};
