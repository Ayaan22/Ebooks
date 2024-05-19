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
import React, {useEffect, useState} from 'react';
import {styles} from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {themeColors} from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {themeFonts} from '../../utils/Themes/Fonts';
import {addToWishlist, removeFromWishlist} from '../../redux/WishlistSlice';
import {useDispatch, useSelector} from 'react-redux';
import Wishlist from '../Wishlist/Wishlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getCurrentBooksApi, getRecommendBooksApi} from '../../apis/Apis';
import AppWrapper from '../../components/AppBody/AppWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [currReadingBooks, setCurrReadingBooks] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('Reader');

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

  console.log(userName, '-->');

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const [currentBooksResponse, recommendBooksResponse] =
          await Promise.all([getCurrentBooksApi(), getRecommendBooksApi()]);

        if (currentBooksResponse.status === 200) {
          setCurrReadingBooks(currentBooksResponse.data.reading_log_entries);
        } else {
          Alert.alert('Error', 'Failed to fetch current reading books.');
        }
        if (recommendBooksResponse.status === 200) {
          setRecommendBooks(recommendBooksResponse.data.reading_log_entries);
        } else {
          Alert.alert('Error', 'Failed to fetch recommended books.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching books data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksData();
    fetchUserName();
  }, []);

  const wishlist = useSelector(state => state.wishlist.wishlist);

  return (
    <AppWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
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
          <AppBody recommendData={recommendBooks} data={currReadingBooks} />
        )}
      </ScrollView>

      <Footer data={wishlist} isLoading={isLoading} />
    </AppWrapper>
  );
};

const AppHeader = ({name}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{}}>
        <Text style={styles.title}>{`Hey, ${name}🖐 `}</Text>
        <View style={styles.divider}></View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Wishlist');
        }}>
        <MaterialIcons
          name="favorite-border"
          size={27}
          style={{top: -2}}
          color={themeColors.themeBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

const AppBody = ({data, recommendData}) => {
  const filteredData = data.filter(item => item.work.title != null);
  const filteredRecomData = recommendData.filter(
    item => item.work.title != null,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const HeaderTitles = ({title}) => {
    return (
      <View style={{marginVertical: 10}}>
        <Text style={styles.heading}>{title}</Text>
        <View style={[styles.divider, {width: '15%'}]}></View>
      </View>
    );
  };
  const handleAddToWishlist = book => () => {
    dispatch(addToWishlist(book));
  };

  const handleRemoveFromWishlist = book => () => {
    dispatch(removeFromWishlist(book.work.title));
  };
  const booksView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {item: item});
        }}
        activeOpacity={0.7}>
        <Image
          resizeMode="cover"
          style={{
            height: responsiveHeight(18),
            width: responsiveWidth(30),
            borderRadius: 0,
          }}
          source={{
            uri: item.work.cover_id
              ? `https://covers.openlibrary.org/b/id/${item.work.cover_id}-L.jpg`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAllPFjGNTDIw12Rr426PsDF1ZjIqveIBcUKS5Mh_uAQ&s',
          }}
        />
      </TouchableOpacity>
    );
  };

  const booksVerticalView = ({item, index}) => {
    const getTitle = item => item?.title || item?.work?.title;

    const isBookInWishlist = wishlist.some(
      value => getTitle(value) === getTitle(item),
    );
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Details', {item: item});
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#F3F3F3',
          borderRadius: 10,
          elevation: 1,
          gap: 10,
        }}>
        <View
          style={{flex: 0.3, backgroundColor: '#F3F3F3', paddingVertical: 10}}>
          <Image
            resizeMode="contain"
            style={{
              aspectRatio: 1,
            }}
            source={{
              uri: item.work.cover_id
                ? `https://covers.openlibrary.org/b/id/${item.work.cover_id}-L.jpg`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAllPFjGNTDIw12Rr426PsDF1ZjIqveIBcUKS5Mh_uAQ&s',
            }}
          />
        </View>

        {/* </View> */}
        <View style={{flex: 0.7, justifyContent: 'center'}}>
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
                styles.title,
                {fontSize: responsiveFontSize(2), flex: 0.8},
              ]}>
              {item.work.title}
            </Text>
            {isBookInWishlist ? (
              <TouchableOpacity onPress={handleRemoveFromWishlist(item)}>
                <MaterialIcons
                  name="favorite"
                  size={23}
                  style={{right: 10}}
                  color={themeColors.themeBlue}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleAddToWishlist(item)}>
                <MaterialIcons
                  name="favorite-border"
                  size={23}
                  style={{right: 10}}
                  color={themeColors.themeBlack}
                />
              </TouchableOpacity>
            )}
          </View>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.title,

              {
                fontSize: responsiveFontSize(1.5),
                fontFamily: themeFonts.regular,
                width: '80%',
              },
            ]}>
            {item.work.author_names.join(', ')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: responsiveFontSize(1.4),
                  fontFamily: themeFonts.regular,
                  color: themeColors.themeBlue,
                },
              ]}>
              Published on
            </Text>
            <Text
              style={[
                styles.title,
                {
                  fontSize: responsiveFontSize(1.4),
                  fontFamily: themeFonts.regular,
                },
              ]}>
              {item.work.first_publish_year}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={themeColors.themeBlack}
        barStyle={'light-content'}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}
        activeOpacity={0.8}
        style={{
          height: responsiveHeight(6),
          borderRadius: 10,
          borderColor: 'grey',
          borderWidth: 1,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          gap: 7,
          marginVertical: 10,
        }}>
        <AntDesign name="search1" size={20} color={'grey'} />
        <Text style={{fontSize: 15}}>Search here..</Text>
      </TouchableOpacity>
      <Image
        style={styles.banner}
        resizeMode="cover"
        source={{
          uri: 'https://www.thehowe.org/wp-content/uploads/2023/02/Book-Banner.jpg',
        }}
      />
      <HeaderTitles title={'Recommended for you'} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={filteredData}
        renderItem={booksView}
        ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
      />
      <HeaderTitles title={'Popular Books for you'} />
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={filteredRecomData}
        renderItem={booksVerticalView}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        ListFooterComponent={() => <View style={{height: 120}}></View>}
      />
    </View>
  );
};

const Footer = ({data, isLoading}) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Wishlist');
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
            backgroundColor: themeColors.themeBlack,
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
              ? `${data.length} Book in Wishlist`
              : `${data.length} Books in Wishlist`}
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
