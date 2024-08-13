import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {fetchWeatherByCityName} from '@services/fetchWeather';
import WeatherSearchForm from '@components/WeatherSearchForm/component';

jest.mock('@services/fetchWeather', () => ({
  fetchWeatherByCityName: jest.fn(),
}));

describe('WeatherSearchForm', () => {
  const mockOnWeatherData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <WeatherSearchForm onWeatherData={mockOnWeatherData} />,
    );

    expect(getByPlaceholderText('Wyszukaj miasto')).toBeTruthy();
    expect(getByTestId('searchButton')).toBeTruthy();
    expect(getByTestId('closeButton')).toBeTruthy();
  });

  test('calls fetchWeatherByCityName when search button is pressed', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <WeatherSearchForm onWeatherData={mockOnWeatherData} />,
    );

    const input = getByPlaceholderText('Wyszukaj miasto');
    const searchButton = getByTestId('searchButton');

    fireEvent.changeText(input, 'Warszawa');
    fireEvent.press(searchButton);

    expect(fetchWeatherByCityName).toHaveBeenCalledWith(
      'Warszawa',
      mockOnWeatherData,
    );
  });

  test('does not call fetchWeatherByCityName when text field is empty', () => {
    const {getByTestId} = render(
      <WeatherSearchForm onWeatherData={mockOnWeatherData} />,
    );

    const searchButton = getByTestId('searchButton');

    fireEvent.press(searchButton);

    expect(fetchWeatherByCityName).not.toHaveBeenCalled();
    expect(mockOnWeatherData).toHaveBeenCalledWith(null);
  });

  test('clears text field when close button is pressed', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <WeatherSearchForm onWeatherData={mockOnWeatherData} />,
    );

    const input = getByPlaceholderText('Wyszukaj miasto');
    const closeButton = getByTestId('closeButton');

    fireEvent.changeText(input, 'Warszawa');
    fireEvent.press(closeButton);

    expect(input.props.value).toBe('');
    expect(mockOnWeatherData).toHaveBeenCalledWith(null);
  });
});
