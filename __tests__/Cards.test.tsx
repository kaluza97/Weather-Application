import React, {ReactNode} from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import StaticCard from '@components/Cards/StaticCard/component';
import {mockWeatherData} from '../__mocks__/@react-native-async-storage/mockWeatherData';

const renderWithNavigation = (component: ReactNode) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('StaticCard Component', () => {
  it('renders correctly with weather data', () => {
    const {getByText} = renderWithNavigation(
      <StaticCard weatherData={mockWeatherData} />,
    );

    expect(getByText('Wrocław')).toBeTruthy();
    expect(getByText('24.36°C')).toBeTruthy();
  });

  it('returns null when no weatherData is provided', () => {
    const {queryByText} = renderWithNavigation(
      <StaticCard weatherData={null} />,
    );

    expect(queryByText('Wrocław')).toBeNull();
    expect(queryByText('24.36°C')).toBeNull();
  });
});
