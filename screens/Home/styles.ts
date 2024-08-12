import { StyleSheet } from 'react-native';
import { black } from '../../variables/global.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
  },
  text: {
    marginLeft: 20,
    marginTop: 40,
    color: 'white',
    fontSize: 30,
  },
});
