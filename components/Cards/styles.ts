import {StyleSheet} from 'react-native';
import {primaryColor, white} from '../../variables/global.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    padding: 16,
    margin: 20,
    marginTop: 0,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: white,
    marginLeft: 8,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    color: white,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
  },
  noFavorites: {
    fontSize: 28,
    color: white,
    textAlign: 'center',
  },
  icon: {
    fontSize: 26,
    color: white,
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
