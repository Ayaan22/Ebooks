import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {themeFonts} from '../../utils/Themes/Fonts';
import {addToWishlist, removeFromWishlist} from '../../redux/WishlistSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppWrapper from '../../components/AppBody/AppWrapper';

const Details = ({route}) => {
  const item = route.params.item;
  const value = route.params.value;
  console.log(item);
  return (
    <AppWrapper>
      <AppHeader />
      <ScrollView>
        <AppBody item={item} value={value} />
      </ScrollView>
      <AppFooter item={item} searchValue={value} />
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

const AppBody = ({item, value}) => {
  const [loading, setLoading] = useState(true);
  const coverId = value ? item.cover_i : item?.work.cover_id;
  return (
    <View style={{flex: 1}}>
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
          style={{
            height: responsiveHeight(20),
            width: responsiveWidth(30),
          }}
          source={{
            uri: coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              : 'https://via.placeholder.com/110',
          }}
          onLoad={() => setLoading(false)} // Hide loader when image is loaded
          onError={() => setLoading(false)} // Hide loader if there is an error loading the image
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
        <Text
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.4),
              fontFamily: themeFonts.regular,
            },
          ]}>
          Author
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.7),
              fontFamily: themeFonts.semiBold,
              opacity: 0.6,
            },
          ]}>
          {value
            ? item?.author_name.join(', ')
            : item?.work?.author_names.join(', ')}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.5),
              fontFamily: themeFonts.regular,
              opacity: 0.6,
            },
          ]}>
          Best seller of The New York Times
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          gap: 5,
          flex: 1,
          top: -20,
        }}>
        <Text style={styles.heading}>About The Book</Text>
        <Text
          style={[
            styles.title,
            {
              fontSize: responsiveFontSize(1.6),
              fontFamily: themeFonts.regular,
              opacity: 0.6,
              lineHeight: 25,
            },
          ]}>
          {item?.subject_facet?.join(', ') || 'No description available.'}
        </Text>
      </View>
    </View>
  );
};

const AppFooter = ({item}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);

  const getTitle = item => item?.title || item?.work?.title;

  const isBookInWishlist = wishlist.some(
    value => getTitle(value) === getTitle(item),
  );

  const navigation = useNavigation();
  const handleNavigation = () => {
    if (isBookInWishlist) {
      navigation.navigate('Wishlist');
    } else {
      dispatch(addToWishlist(item));
    }
  };
  return (
    <View style={{padding: 10}}>
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
          {isBookInWishlist ? 'Go To Wishlist' : 'Add To Wishlist'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
