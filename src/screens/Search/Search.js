import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../../utils/Themes/Colors';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {searchBooksApi} from '../../apis/Apis';
import AppWrapper from '../../components/AppBody/AppWrapper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {themeFonts} from '../../utils/Themes/Fonts';
import Snackbar from 'react-native-snackbar';

const Search = ({navigation}) => {
  const [searchData, setSearchData] = useState('');
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <AppWrapper>
      <AppHeader
        data={data}
        setdata={setdata}
        searchData={searchData}
        setSearchData={setSearchData}
        setLoading={setLoading}
      />
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 20}}
          size="large"
          color={themeColors.themeBlack}
        />
      ) : (
        <AppBody data={data} loading={loading} setLoading={setLoading} />
      )}
    </AppWrapper>
  );
};

const AppHeader = ({searchData, setSearchData, setdata, setLoading}) => {
  const navigation = useNavigation();

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (searchData.length > 0) {
      try {
        setLoading(true); // Set loading to true when starting search
        const {data} = await searchBooksApi(searchData);
        setdata(data.docs);
        console.log(data.docs);
      } catch (error) {
        console.error('Error searching for books:', error);
      } finally {
        setLoading(false);
      }
    } else {
      Snackbar.show({
        text: 'Please enter a search term',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={themeColors.themeBlue} />
      <TouchableOpacity style={{flex: 0.1}} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color={themeColors.themeWhite} />
      </TouchableOpacity>
      <View style={[styles.input, {flexDirection: 'row'}]}>
        <TextInput
          value={searchData}
          onChangeText={text => setSearchData(text)}
          style={{flex: 1, fontFamily: themeFonts.medium}}
          placeholder="Search books here..."
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flex: 0.2,
            alignItems: 'center',
          }}
          onPress={handleSearch}>
          <AntDesign name="search1" size={20} color={themeColors.themeBlack} />
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
};

const AppBody = ({data, loading}) => {
  const navigation = useNavigation();
  const renderTitles = ({item, index}) => {
    const title = item.title;
    const isLastItem = index === data.length - 1;
    return (
      <TouchableOpacity
        style={{
          borderBottomColor: '#E3E3E3',
          borderBottomWidth: isLastItem ? 0 : 3,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          navigation.navigate('Details', {item: item, value: true});
        }}>
        <Text
          style={{
            fontFamily: themeFonts.medium,
            color: themeColors.themeBlack,
            paddingBottom: 5,
            opacity: 0.7,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, paddingVertical: 20}}>
      <FlatList
        data={data}
        renderItem={renderTitles}
        ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  header: {
    flex: 0.15,
    backgroundColor: themeColors.themeBlue,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: themeColors.themeWhite,
    flex: 0.85,
    borderRadius: 5,
    paddingLeft: 10,
  },
  container: {
    backgroundColor: themeColors.themeBlue,
    paddingTop: 20,
  },
});
