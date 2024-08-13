import {StyleSheet} from 'react-native';
import {
  secondaryColor,
  inputTextColor,
  primaryColor,
  white,
} from '../../variables/global.styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: secondaryColor,
    color: inputTextColor,
    flex: 1,
  },
  touchableOpacity: {
    marginLeft: 10,
  },
  icon: {
    backgroundColor: primaryColor,
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
    color: white,
  },
});
