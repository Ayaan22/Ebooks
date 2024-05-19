import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {themeColors} from '../../utils/Themes/Colors';

const AppWrapper = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.themeWhite,
  },
});
