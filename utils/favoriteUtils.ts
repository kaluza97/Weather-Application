import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (): Promise<Array<number>> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    Alert.alert("Przepraszamy!", 'Wystąpił błąd podczas pobierania danych.', [
      { text: "OK" }
    ])
    return [];
  }
};

export const toggleFavorite = async (
  favorites: Array<number>,
  cityId: number,
): Promise<Array<number>> => {
  try {
    const modifiedFavorites = [...favorites];
    const isFavoriteExist = modifiedFavorites.find(id => id === cityId);

    if (isFavoriteExist) {
      modifiedFavorites.splice(modifiedFavorites.indexOf(isFavoriteExist), 1);
    } else {
      modifiedFavorites.push(cityId);
    }

    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(modifiedFavorites),
    );
    return modifiedFavorites;
  } catch (error) {
    Alert.alert("Przepraszamy!", 'Wystąpił błąd podczas dodawania lub usuwania elementu.', [
      { text: "OK" }
    ])
    return [];
  }
};

export const setFavorites = async (favorites: Array<number>) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    Alert.alert("Przepraszamy!", 'Wystąpił błąd podczas zapisywania elementu.', [
      { text: "OK" }
    ])
  }
};

export const removeFavorite = async (id: number): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(favoriteId => favoriteId !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (error) {
    Alert.alert("Przepraszamy!", 'Wystąpił błąd podczas usuwania elementu.', [
      { text: "OK" }
    ])

  }
};
