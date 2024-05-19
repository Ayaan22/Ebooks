import {StyleSheet} from 'react-native';
import {themeColors} from '../../utils/Themes/Colors';
import {themeFonts} from '../../utils/Themes/Fonts';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: themeColors.themeBlue,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    color: themeColors.themeBlack,
    fontFamily: themeFonts.medium,
  },
  heading: {
    fontSize: responsiveFontSize(2.2),
    color: themeColors.themeBlack,
    fontFamily: themeFonts.medium,
  },
});
