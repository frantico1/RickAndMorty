/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Pagination from '../components/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../utils/fetchUtils';
import {loadFavorites, setApi} from '../features/data';
import {useRoute} from '@react-navigation/native';

const SeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const [selectMenu, setSelectMenu] = useState(route.name);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const {data, api} = useSelector(state => state.data);
  const [filteredData, setFilteredData] = useState(null);

  const handleFetchData = () => {
    if (api !== null) {
      fetchData(dispatch, api);
    } else {
      Alert.alert('Uyarı !', 'Görüntülenecek başka sayfa yok.');
    }
  };

  useEffect(() => {
    handleFetchData();
    dispatch(loadFavorites());
  }, [api]);

  const nextPage = () => {
    dispatch(setApi(data.info.next));
  };

  const previousPage = () => {
    dispatch(setApi(data.info.prev));
  };

  const routeToCharacters = () => {
    navigation.navigate('Characters');
  };

  const routeToHomePage = () => {
    navigation.navigate('Home');
  };

  const handleSearch = text => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredData(null);
    } else {
      const filtered = data.results.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const RenderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('EpisodesDetail', {episodeData: item})
        }>
        <View style={styles.containerItem}>
          <View style={styles.headerContainer}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.name}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.text, {color: 'gray'}]}>{item.air_date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const NavigationButtons = () => {
    return (
      <View style={styles.navigationContainer}>
        <TouchableWithoutFeedback onPress={routeToHomePage}>
          <View
            style={[
              styles.navigationButton,
              {
                backgroundColor: selectMenu === 'Home' ? 'orange' : 'black',
              },
            ]}>
            <Text
              style={{
                color: selectMenu === 'Home' ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Home Page
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={routeToCharacters}>
          <View
            style={[
              styles.navigationButton,
              {
                backgroundColor:
                  selectMenu === 'Character' ? 'orange' : 'black',
              },
            ]}>
            <Text
              style={{
                color: selectMenu === 'Character' ? 'white' : 'gray',
                fontWeight: 'bold',
              }}>
              Characters
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationButtons />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Episodes"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <Pagination
        next={nextPage}
        prev={previousPage}
        page={data?.info?.pages}
        count={data?.info?.count}
      />
      <FlatList
        data={filteredData || data?.results}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RenderItem item={item} />}
        ItemSeparatorComponent={SeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;

const H = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  containerItem: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: H * 0.02,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  text: {
    color: 'orange',
    fontSize: H * 0.02,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  headerContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
  },
  dateContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  navigationButton: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    padding: H * 0.02,
  },
  searchContainer: {
    paddingHorizontal: H * 0.02,
    marginBottom: H * 0.01,
    marginTop: H * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: H * 0.02,
    backgroundColor: 'white',
    width: '100%',
  },
});
