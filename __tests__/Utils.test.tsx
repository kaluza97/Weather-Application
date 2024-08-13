import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFavorites,
  toggleFavorite,
  setFavorites,
  removeFavorite,
} from '@utils/favoriteUtils';
import {Alert} from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    test('returns an empty array when there is no data in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await getFavorites();
      expect(result).toEqual([]);
    });

    test('returns correct data when it exists in AsyncStorage', async () => {
      const favoritesData = JSON.stringify([1, 2, 3]);
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(favoritesData);
      const result = await getFavorites();
      expect(result).toEqual([1, 2, 3]);
    });

    test('returns an empty array and displays an alert in case of error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Błąd'));
      const result = await getFavorites();
      expect(result).toEqual([]);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wystąpił błąd podczas pobierania danych.',
        [{text: 'OK'}],
      );
    });
  });

  describe('toggleFavorite', () => {
    test('adds a new favorite element when it does not exist in the array', async () => {
      const favorites = [1, 2];
      const cityId = 3;
      const modifiedFavorites = [1, 2, 3];

      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await toggleFavorite(favorites, cityId);

      expect(result).toEqual(modifiedFavorites);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(modifiedFavorites),
      );
    });

    test('removes an existing favorite element from the array', async () => {
      const favorites = [1, 2, 3];
      const cityId = 2;
      const modifiedFavorites = [1, 3];

      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await toggleFavorite(favorites, cityId);

      expect(result).toEqual(modifiedFavorites);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(modifiedFavorites),
      );
    });

    test('returns an empty array and displays an alert in case of error', async () => {
      const favorites = [1, 2];
      const cityId = 3;

      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Błąd'));

      const result = await toggleFavorite(favorites, cityId);

      expect(result).toEqual([]);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wystąpił błąd podczas dodawania lub usuwania elementu.',
        [{text: 'OK'}],
      );
    });
  });

  describe('setFavorites', () => {
    test('saves favorite elements in AsyncStorage', async () => {
      const favorites = [1, 2, 3];

      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(null);

      await setFavorites(favorites);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(favorites),
      );
    });

    test('displays an alert in case of error', async () => {
      const favorites = [1, 2, 3];

      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Błąd'));

      await setFavorites(favorites);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wystąpił błąd podczas zapisywania elementu.',
        [{text: 'OK'}],
      );
    });
  });

  describe('removeFavorite', () => {
    test('removes a favorite element from the array', async () => {
      const favorites = [1, 2, 3];
      const cityId = 2;
      const modifiedFavorites = [1, 3];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(favorites),
      );
      (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(null);

      await removeFavorite(cityId);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify(modifiedFavorites),
      );
    });

    test('displays an alert in case of error', async () => {
      const cityId = 2;
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Błąd'));

      await removeFavorite(cityId);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Przepraszamy!',
        'Wystąpił błąd podczas usuwania elementu.',
        [{text: 'OK'}],
      );
    });
  });
});
