import {StyleSheet} from 'react-native';
import {themeColors} from '../../utils/Themes/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {themeFonts} from '../../utils/Themes/Fonts';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 0.085,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    color: themeColors.themeBlack,
    fontFamily: themeFonts.medium,
  },
  divider: {
    borderColor: themeColors.themeBlue,
    borderWidth: 2,
    width: '30%',
  },
});
