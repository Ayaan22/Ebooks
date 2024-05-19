import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../utils/Themes/Colors';

const Splash = ({navigation}) => {
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

      <Ionicons
        style={styles.logo}
        name="book-outline"
        size={100}
        color={themeColors.themeWhite}
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
});
