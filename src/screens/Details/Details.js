import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { themeFonts } from '../../utils/Themes/Fonts';
import { addToWishlist, removeFromWishlist } from '../../redux/WishlistSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppWrapper from '../../components/AppBody/AppWrapper';
import { addToCart } from '../../redux/CartSlice';

const Details = ({ route }) => {
  const item = route.params.main;

  console.log(item, '--cat');
  return (
    <AppWrapper>
      <AppHeader />
      <ScrollView>
        <AppBody item={item} />
      </ScrollView>
      <AppFooter item={item} />
    </AppWrapper>
  );
};

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={themeColors.themeWhite} />
      </TouchableOpacity>
    </View>
  );
};

const AppBody = ({ item, value }) => {
  const [loading, setLoading] = useState(true);
  console.log(item, '-->');
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={themeColors.themeBlue} />
      <View
        style={{
          backgroundColor: themeColors.themeBlue,
          height: responsiveHeight(27),
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: 'center',
        }}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={themeColors.themeWhite}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: 0,
              bottom: 50,
              left: 0,
              right: 0,
            }}
          />
        )}
        <Image
          resizeMode="contain"
          style={{ height: responsiveHeight(20), width: responsiveWidth(100) }}
          source={{ uri: item.img }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>
      <View
        style={{
          backgroundColor: themeColors.themeWhite,
          height: responsiveHeight(13),
          marginHorizontal: 20,
          borderRadius: 10,
          top: -50,
          elevation: 5,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              styles.title,
              { fontSize: responsiveFontSize(2), fontFamily: themeFonts.regular },
            ]}>
            {item.name
              ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
              : 'Loading...'}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.title,
              {
                fontSize: responsiveFontSize(2.3),
                fontFamily: themeFonts.semiBold,
                color: themeColors.themeBlue,
                top: 5,
              },
            ]}>
            {' '}
            ₹ {item.price}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.5),
              fontFamily: themeFonts.semiBold,
              opacity: 0.5,
            },
          ]}>
          {item.pieces} pieces
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20, gap: 5, flex: 1, top: -20 }}>
        <Text style={styles.heading}>About The Product</Text>
        <Text
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.5),
              fontFamily: themeFonts.regular,
              opacity: 0.6,
              lineHeight: 25,
              textAlign: 'justify'
            },
          ]}>
          Fruits and vegetables offer a plethora of health benefits, making them
          essential components of a balanced diet. Packed with essential
          vitamins, minerals, and antioxidants, these nutritious foods
          contribute to overall well-being and help prevent chronic diseases.
          Their high fiber content aids digestion and promotes a healthy gut
          microbiome, while their low calorie and fat content make them ideal
          for weight management.
        </Text>
      </View>
    </View>
  );
};

const AppFooter = ({ item }) => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);



  const isProductInCart = cartData.some(
    value => item.name == value.name
  );

  const navigation = useNavigation();
  const handleNavigation = () => {
    if (isProductInCart) {
      navigation.navigate('Cart');
    } else {
      dispatch(addToCart(item));
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          backgroundColor: themeColors.themeBlue,
          padding: 20,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.7),
              fontFamily: themeFonts.semiBold,
              color: themeColors.themeWhite,
            },
          ]}>
          {isProductInCart ? 'Go To Cart' : 'Add To Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
