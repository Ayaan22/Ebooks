import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { themeColors } from '../utils/Themes/Colors';
import { themeFonts } from '../utils/Themes/Fonts';
import { addToCart, removeFromCart } from '../redux/CartSlice';

const ProductsCarousel = ({ data }) => {
    console.log(data, '--><')
    const dispatch = useDispatch();
    const storeData = useSelector(state => state.cart);


    const nav = useNavigation();
    const renderProducts = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    nav.navigate('Details', {
                        main: item,
                    });
                }}
                activeOpacity={0.7}
                style={{
                    height: responsiveHeight(28),
                    borderWidth: 2,
                    borderColor: '#E3E3E3',
                    width: responsiveWidth(45),
                    borderRadius: 15,

                }}>
                <View style={{ flex: 0.6, borderRadius: 15, }}>
                    <Image
                        resizeMode="contain"
                        style={{
                            flex: 1,

                        }}
                        source={{ uri: item.img }}
                    />
                </View>

                <View
                    style={{ flex: 0.4, paddingHorizontal: 10, justifyContent: 'center' }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: responsiveFontSize(1.7),
                            fontFamily: themeFonts.medium,
                            color: themeColors.themeBlack,
                        }}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Text>
                    <Text
                        style={{
                            color: 'grey',
                            top: -3,
                            fontSize: responsiveFontSize(1.5),
                        }}>
                        {item.pieces} pieces
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                        <Text
                            style={{
                                fontSize: responsiveFontSize(2),
                                fontFamily: themeFonts.semiBold,
                                color: themeColors.themeBlack,
                            }}>
                            ₹ {item.price}
                        </Text>
                        {storeData?.some(value => value.name === item.name) ? (
                            <AntDesign
                                name="minussquare"
                                size={30}
                                color={themeColors.themeBlue}
                                onPress={() => {
                                    dispatch(removeFromCart(item));
                                }}
                            />
                        ) : (
                            <AntDesign
                                name="plussquare"
                                size={30}
                                color={themeColors.themeBlue}
                                onPress={() => {
                                    dispatch(addToCart(item));
                                }}
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderProducts}
            ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
            ListFooterComponent={() => <View style={{ bottom: 100 }}></View>}
        />
    );
};

export default ProductsCarousel;
