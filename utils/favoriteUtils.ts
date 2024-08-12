import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (): Promise<Array<number>> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Błąd pobierania ulubionych:', error);
        return [];
    }
};

export const toggleFavorite = async (favorites: Array<number>, cityId: number): Promise<Array<number>> => {
    try {
        const modifiedFavorites = [...favorites];
        const isFavoriteExist = modifiedFavorites.find(id => id === cityId);

        if (isFavoriteExist) {
            modifiedFavorites.splice(modifiedFavorites.indexOf(isFavoriteExist), 1);
        } else {
            modifiedFavorites.push(cityId);
        }

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(modifiedFavorites));
        return modifiedFavorites;
    } catch (error) {
        console.error('Błąd dodawania/usuwania z ulubionych:', error);
        return [];
    }
};

export const setFavorites = async (favorites: Array<number>) => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Błąd zapisywania do ulubionych:', error);
    }
};

export const deleteFavorite = async (cityId: number) => {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter((id) => id !== cityId);
    await setFavorites(newFavorites);
};

export const deleteAllFavorites = async () => {
    await setFavorites([]);
};
