import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AppWrapper from '../../components/AppBody/AppWrapper';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../redux/CartSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themeFonts } from '../../utils/Themes/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Snackbar from 'react-native-snackbar';

const Cart = () => {
  const cartData = useSelector(state => state.cart);

  const navigation = useNavigation();



  return (
    <AppWrapper>
      <AppHeader />
      <AppBody />
    </AppWrapper>
  );
};

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={themeColors.themeBlack} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={themeColors.themeBlack} />
      </TouchableOpacity>
      <View style={{}}>
        <Text style={styles.title}>Cart Products </Text>
        <View style={styles.divider}></View>
      </View>
    </View>
  );
};

const AppBody = () => {
  const dispatch = useDispatch();

  const handleIncrementQuantity = (item) => {
    if (item.quantity === 7) {
      Snackbar.show({
        text: 'Maximum quantity reached!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    } else {
      dispatch(incrementQuantity(item));
    }
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const cartData = useSelector(state => state.cart);
  const productsVerticalView = ({ item, index }) => {


    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#F3F3F3',
          borderRadius: 10,
          elevation: 1,
          gap: 10,
          padding: 10,

        }}>
        <View style={{ flex: 0.3, backgroundColor: '#F3F3F3' }}>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
            source={{
              uri: item.img,
            }}
          />
        </View>

        <View style={{ flex: 0.7, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                {
                  fontSize: responsiveFontSize(2),
                  fontFamily: themeFonts.medium,
                  color: themeColors.themeBlack,
                  flex: 0.8,
                },
              ]}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
              <AntDesign

                name="close"
                size={20}
                style={{ right: 10 }}
                color={themeColors.themeBlue}
              />
            </TouchableOpacity>

          </View>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: responsiveFontSize(1.5),
              fontFamily: themeFonts.regular,
              color: 'grey',
            }}>
            {item.pieces}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontFamily: themeFonts.semiBold,
                color: themeColors.themeBlue,
              }}>
              ₹ {item.price}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity onPress={() => {
                dispatch(decrementQuantity(item));
              }}>
                <AntDesign
                  name="minuscircleo"
                  size={20}
                  color={themeColors.themeBlue}

                />
              </TouchableOpacity>

              <Text style={{ fontSize: 17 }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrementQuantity(item)}>
                <AntDesign
                  name="pluscircleo"
                  size={20}
                  color={themeColors.themeBlue}

                />
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <FlatList
        data={cartData}
        renderItem={productsVerticalView}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginTop: responsiveHeight(30),
              textAlign: 'center',
              color: themeColors.themeBlack,
              fontFamily: themeFonts.medium,
            }}>
            No Products in your Cart
          </Text>
        )}
      />
    </View>
  );
};

export default Cart;