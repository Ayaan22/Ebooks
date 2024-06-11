import { StyleSheet } from 'react-native';
import { themeColors } from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { themeFonts } from '../../utils/Themes/Fonts';

export const styles = StyleSheet.create({
  header: {
    flex: 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: responsiveFontSize(2.4),
    color: themeColors.themeBlack,
    fontFamily: themeFonts.medium,
  },

  divider: {
    borderColor: themeColors.themeBlue,
    borderWidth: 2,
    width: '30%',
  },
  container: {
    marginTop: responsiveHeight(1),
    gap: 13,
  },
  heading: {
    fontSize: responsiveFontSize(2.2),
    color: themeColors.themeBlack,
    fontFamily: themeFonts.medium,
  },
  banner: {
    height: responsiveHeight(20),
    borderRadius: 10,

  },
});
