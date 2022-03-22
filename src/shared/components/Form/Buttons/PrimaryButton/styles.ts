import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from 'styles/theme';

export const styles = {
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    height: RFValue(48),
    borderRadius: 6,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '700',
  },
};
