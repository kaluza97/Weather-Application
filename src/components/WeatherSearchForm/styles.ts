import { StyleSheet } from 'react-native';
import { colors } from '@constants/global.styles';

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
    backgroundColor: colors.secondary,
    color: colors.white,
    flex: 1,
  },
  touchableOpacity: {
    marginLeft: 10,
  },
  icon: {
    backgroundColor: colors.primary,
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
    color: colors.white,
  },
});
