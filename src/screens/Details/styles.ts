import { StyleSheet } from 'react-native';
import { colors } from '@constants/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 22,
    padding: 10,
    color: colors.white,
  },
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.white,
  },
  currentTemp: {
    fontSize: 110,
    color: colors.white,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  icon: {
    color: colors.white,
    fontSize: 28,
    marginRight: 10,
  },
  markerIcon: {
    backgroundColor: colors.primary,
    fontSize: 34,
    padding: 10,
    borderRadius: 10,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.buttonsColor,
    marginTop: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    padding: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
