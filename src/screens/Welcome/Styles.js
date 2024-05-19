import {StyleSheet} from 'react-native';
import {themeColors} from '../../utils/Themes/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  line: {
    borderTopColor: themeColors.themeBlack,
    borderTopWidth: 2,
    width: '100%',
  },
  secContainer: {
    flex: 1,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    color: themeColors.themeBlack,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: responsiveFontSize(1.7),
    color: themeColors.themeBlack,
    fontWeight: '500',
    opacity: 0.5,
    textAlign: 'center',
    lineHeight: 20,
    width: '90%',
    marginTop: 5,
  },
  descripContainer: {
    alignItems: 'center',
    flex: 0.45,
    justifyContent: 'flex-end',
  },
  btnContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: themeColors.themeBlue,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnTitle: {
    color: themeColors.themeWhite,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});
