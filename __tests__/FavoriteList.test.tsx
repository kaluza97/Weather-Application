import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import * as favoriteUtils from '@utils/favoriteUtils';
import * as weatherService from '@services/fetchWeather';
import FavoriteList from '@components/FavoriteList/component';
import {mockWeatherData} from '../__mocks__/@react-native-async-storage/mockWeatherData';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@utils/favoriteUtils', () => ({
  getFavorites: jest.fn(),
  removeFavorite: jest.fn(),
}));

jest.mock('@services/fetchWeather', () => ({
  fetchWeatherByIdsList: jest.fn(),
}));

describe('FavoriteList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = (component: React.ReactNode) => {
    return render(<NavigationContainer>{component}</NavigationContainer>);
  };

  it('renders no favorites text', () => {
    (favoriteUtils.getFavorites as jest.Mock).mockResolvedValue([]);

    const {getByText} = renderWithNavigation(<FavoriteList />);

    expect(getByText('Brak ulubionych miast')).toBeTruthy();
  });

  it('renders a list of favorite items when favorites are available', async () => {
    (favoriteUtils.getFavorites as jest.Mock).mockResolvedValue([
      mockWeatherData.id,
    ]);
    (weatherService.fetchWeatherByIdsList as jest.Mock).mockImplementation(
      (_ids, setData) => {
        setData([mockWeatherData]);
      },
    );

    const {getByText} = renderWithNavigation(<FavoriteList />);

    await waitFor(() => {
      expect(getByText(mockWeatherData.name)).toBeTruthy();
    });
  });
});
