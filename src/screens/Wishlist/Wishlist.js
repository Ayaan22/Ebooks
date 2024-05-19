import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useDebugValue} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppWrapper from '../../components/AppBody/AppWrapper';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {themeColors} from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {addToWishlist, removeFromWishlist} from '../../redux/WishlistSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {themeFonts} from '../../utils/Themes/Fonts';

const Wishlist = () => {
  return (
    <AppWrapper>
      <AppHeader />
      <AppBody />
    </AppWrapper>
  );
};

const AppHeader = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={themeColors.themeBlack} />
      </TouchableOpacity>
      <View style={{}}>
        <Text style={styles.title}>WishList Products </Text>
        <View style={styles.divider}></View>
      </View>
    </View>
  );
};

const AppBody = () => {
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToWishlist = book => () => {
    // Ensure it's a function that returns a function
    dispatch(addToWishlist(book));
  };

  const handleRemoveFromWishlist = book => () => {
    const bookTitle = book.title || book.work?.title;
    dispatch(removeFromWishlist(bookTitle));
  };

  const booksVerticalView = ({item, index}) => {
    const getTitle = item => item?.title || item?.work?.title;
    const coverId = item.cover_i ? item.cover_i : item?.work.cover_id;
    console.log(item);
    const isBookInWishlist = wishlist.some(
      value => getTitle(value) === getTitle(item),
    );
    return (
      <View
        
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
              uri: coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                : 'https://via.placeholder.com/110',
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
              {item?.work?.title ? item?.work?.title : item?.title}
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
            {item?.work?.author_names
              ? item?.work?.author_names.join(', ')
              : item?.author_name.join(', ')}
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
              {item?.work?.first_publish_year
                ? item?.work?.first_publish_year
                : item?.first_publish_year}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, margin: 20}}>
      <FlatList
        data={wishlist}
        renderItem={booksVerticalView}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginTop: responsiveHeight(30),
              textAlign: 'center',
              color: themeColors.themeBlack,
              fontFamily: themeFonts.medium,
            }}>
            No Products in your Wishlist
          </Text>
        )}
      />
    </View>
  );
};

export default Wishlist;
