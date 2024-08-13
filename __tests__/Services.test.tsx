import {Alert} from 'react-native';
import {weatherDataSchema} from '@components/WeatherSearchForm/types';
import {
  fetchWeatherByCityName,
  fetchWeatherById,
  fetchWeatherByIdsList,
} from '@services/fetchWeather';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

global.fetch = jest.fn();

const mockWeatherData = {
  id: 1,
  name: 'City',
  main: {
    temp: 20,
  },
};

const mockSafeParseSuccess = {
  success: true,
  data: mockWeatherData,
};

const mockSafeParseFailure = {
  success: false,
};

describe('fetchWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherByCityName', () => {
    test('calls dataSetter with correct data when fetch and parse are successful', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        }),
      );
      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValueOnce(mockSafeParseSuccess);

      const dataSetter = jest.fn();
      await fetchWeatherByCityName('City', dataSetter);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('City'));
      expect(weatherDataSchema.safeParse).toHaveBeenCalledWith(mockWeatherData);
      expect(dataSetter).toHaveBeenCalledWith(mockWeatherData);
    });

    test('calls alert and returns null when fetch fails', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
        }),
      );

      const dataSetter = jest.fn();
      const result = await fetchWeatherByCityName('City', dataSetter);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wyszukiwanie przebiegło nieprawidłowo. Spróbuj ponownie później.',
        [{text: 'OK'}],
      );
      expect(result).toBeNull();
    });

    test('calls dataSetter with data when parse fails', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        }),
      );
      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValueOnce(mockSafeParseFailure);

      const dataSetter = jest.fn();
      await fetchWeatherByCityName('City', dataSetter);

      expect(dataSetter).toHaveBeenCalledWith(mockWeatherData);
    });
  });

  describe('fetchWeatherById', () => {
    test('returns correct data when fetch and parse are successful', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        }),
      );
      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValueOnce(mockSafeParseSuccess);

      const result = await fetchWeatherById(1);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('1'));
      expect(weatherDataSchema.safeParse).toHaveBeenCalledWith(mockWeatherData);
      expect(result).toEqual(mockWeatherData);
    });

    test('calls alert and returns null when fetch fails', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
        }),
      );

      const result = await fetchWeatherById(1);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wyszukiwanie przebiegło nieprawidłowo. Spróbuj ponownie później.',
        [{text: 'OK'}],
      );
      expect(result).toBeNull();
    });

    test('returns data when parse fails', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        }),
      );
      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValueOnce(mockSafeParseFailure);

      const result = await fetchWeatherById(1);

      expect(result).toEqual(mockWeatherData);
    });
  });

  describe('fetchWeatherByIdsList', () => {
    test('calls dataSetter with correct data when fetch is successful', async () => {
      (fetch as jest.Mock).mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        }),
      );
      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValue(mockSafeParseSuccess);

      const dataSetter = jest.fn();
      await fetchWeatherByIdsList([1, 2], dataSetter);

      expect(dataSetter).toHaveBeenCalledWith([
        mockWeatherData,
        mockWeatherData,
      ]);
    });

    test('calls alert when fetch fails', async () => {
      (fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error('Błąd')),
      );

      const dataSetter = jest.fn();
      await fetchWeatherByIdsList([1, 2], dataSetter);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wystąpił błąd podczas pobierania danych pogodowych.',
        [{text: 'OK'}],
      );
    });

    test('filters out null values from results', async () => {
      (fetch as jest.Mock)
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockWeatherData),
          }),
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
          }),
        );

      weatherDataSchema.safeParse = jest
        .fn()
        .mockReturnValueOnce(mockSafeParseSuccess);

      const dataSetter = jest.fn();
      await fetchWeatherByIdsList([1, 2], dataSetter);

      expect(dataSetter).toHaveBeenCalledWith([mockWeatherData]);
    });
  });
});
