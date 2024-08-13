import {StyleSheet} from 'react-native';
import {buttonsColor, primaryColor, white} from '../../variables/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
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
    color: white,
  },
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: white,
  },
  currentTemp: {
    fontSize: 110,
    color: white,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  icon: {
    color: white,
    fontSize: 28,
    marginRight: 10,
  },
  markerIcon: {
    backgroundColor: primaryColor,
    fontSize: 34,
    padding: 10,
    borderRadius: 10,
    color: white,
  },
  button: {
    backgroundColor: buttonsColor,
    marginTop: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    padding: 15,
    fontWeight: 'bold',
    color: primaryColor,
  },
});
