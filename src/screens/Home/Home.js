import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  ScrollView,
  Touchable,
  TouchableOpacity,
  StatusBar,
  Appearance,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { themeFonts } from '../../utils/Themes/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AppWrapper from '../../components/AppBody/AppWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsCarousel from '../../components/ProductsCarousel';
import { fruits, vegetables } from '../../utils/MockData/Data';
import { fetchData } from '../../apis/Apis';

const Home = () => {
  const [productsData, setproductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('Reader');
  console.log(productsData)

  const fetchUserName = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      if (jsonValue != null) {
        const userInfo = JSON.parse(jsonValue);
        setUserName(userInfo.user.givenName); // Assumes user name is at userInfo.user.name
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve user name.');
    }
  };

  useEffect(() => {
    fetchDataAndUserName();
  }, []);

  const fetchDataAndUserName = async () => {
    try {
      await fetchUserName();
      const { data, status } = await fetchData();
      if (status == 200) {
        setproductsData(data?.products);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const cartData = useSelector(state => state.cart);

  return (
    <AppWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 20, marginBottom: 20 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: cartData.length > 0 && !isLoading ? 100 : 20,
        }}>
        <AppHeader name={userName} />

        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <ActivityIndicator size="large" color={themeColors.themeBlue} />
          </View>
        ) : (
          <AppBody data={productsData} />
        )}
      </ScrollView>

      <Footer data={cartData} isLoading={isLoading} />
    </AppWrapper>
  );
};

const AppHeader = ({ name }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{}}>
        <Text style={styles.title}>{`Hey, ${name}🖐 `}</Text>
        <View style={styles.divider}></View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Feather
          name="shopping-bag"
          size={27}
          style={{ top: -2, opacity: 0.6 }}
          color={themeColors.themeBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

const AppBody = ({ data }) => {
  const HeaderTitles = ({ title }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.heading}>{title}</Text>
        <View style={[styles.divider, { width: '15%' }]}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        resizeMode="cover"
        source={{
          uri: 'https://thumbs.dreamstime.com/b/delivery-grocery-shopping-healthy-food-background-vegan-vegetarian-paper-bag-vegetables-fruits-nuts-grains-green-copy-178150218.jpg',
        }}
      />
      <HeaderTitles title={'Seasonal Fruits'} />
      <ProductsCarousel data={fruits} />
      <HeaderTitles title={'Best Sellings'} />
      <ProductsCarousel data={vegetables} />
    </View>
  );
};

const Footer = ({ data, isLoading }) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Cart');
  };
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 10,
        paddingHorizontal: 20,
      }}>
      {data?.length > 0 && !isLoading && (
        <TouchableOpacity
          onPress={handleNavigation}
          activeOpacity={0.8}
          style={{
            backgroundColor: themeColors.themeBlue,
            padding: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              styles.heading,
              {
                color: themeColors.themeWhite,
                fontSize: responsiveFontSize(1.7),
              },
            ]}>
            {data.length === 1
              ? `${data.length} Product in Cart`
              : `${data.length} Products in Cart`}
          </Text>
          <View>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={themeColors.themeWhite}
              size={23}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Home;
