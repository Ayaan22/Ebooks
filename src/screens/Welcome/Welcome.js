import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../utils/Themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AppWrapper from '../../components/AppBody/AppWrapper';
import Snackbar from 'react-native-snackbar';


const Welcome = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      Snackbar.show({
        text: 'Sign in successful!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
      if (userInfo) {
        const jsonValue = JSON.stringify(userInfo);
        await AsyncStorage.setItem('key', jsonValue);
        navigation.replace('Home');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Snackbar.show({
          text: 'Sign in cancelled',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Snackbar.show({
          text: 'SignIn in progress',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'orange',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Snackbar.show({
          text: 'Play services not available or outdated',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      } else {
        Snackbar.show({
          text: `Some other error: ${error.message}`,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    }
  };

  return (
    <AppWrapper>
      <View style={{padding: 20, flex: 1}}>
        <StatusBar
          backgroundColor={themeColors.themeWhite}
          barStyle="dark-content"
        />
        <Image
          style={styles.bgImage}
          source={require('../../../assets/images/wlcm.png')}
        />
        <View style={styles.line} />
        <View style={styles.secContainer}>
          <View style={styles.descripContainer}>
            <Text style={styles.title}>Only Books Can Help You</Text>
            <Text style={styles.subTitle}>
              Books can help you to increase your knowledge and become more
              succesfully.
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.7}
              style={styles.loginBtn}>
              <Ionicons
                size={18}
                name="logo-google"
                color={themeColors.themeWhite}
              />
              <Text style={styles.btnTitle}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppWrapper>
  );
};

export default Welcome;
