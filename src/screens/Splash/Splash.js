import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../../utils/Themes/Colors';
import { themeFonts } from '../../utils/Themes/Fonts';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('key').then(value => {
        if (value) {
          navigation.replace('Home');
        } else {
          navigation.replace('Welcome');
        }
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} hidden />
      <Image
        resizeMode="contain"
        source={{
          uri: 'https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png',
        }}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.themeBlue,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '20%',
    width: '35%',
  },
});
