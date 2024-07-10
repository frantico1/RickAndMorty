/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import axios from 'axios';
import {fetchCharacters} from '../utils/fetchUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Pagination from '../components/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../features/data';

const SeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const CharacterCard = ({item, navigation}) => {
  const [character, setCharacter] = useState(null);
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.data);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(item.url);
        setCharacter(response.data);
      } catch (error) {
        console.log('Bir hata oluştu!', error);
      }
    };

    fetchCharacterDetails();
  }, [item]);

  if (!character) {
    return <Text>Loading...</Text>;
  }

  const handleAddFavorite = value => {
    dispatch(addFavorite(value.id));
  };

  const handleRemoveFavorite = value => {
    dispatch(removeFavorite(value.id));
  };

  const findFavorites = id => {
    return favorites.some(item => item === id);
  };

  const handleClick = name => {
    navigation.navigate('CharacterDetail', {characterDetails: character});
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TouchableWithoutFeedback onPress={() => handleClick(character.id)}>
        <View style={styles.card}>
          <View key={character.id} style={styles.cardContainer}>
            <Image source={{uri: character.image}} style={styles.image} />
          </View>
          <Text style={styles.characterName}>{character.name}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C1C1E',
          paddingRight: H * 0.01,
        }}>
        {findFavorites(character.id) ? (
          <TouchableWithoutFeedback
            onPress={() => handleRemoveFavorite(character)}>
            <FontAwesome name="heart" size={H * 0.03} color={'red'} />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => handleAddFavorite(character)}>
            <FontAwesome name="heart" size={H * 0.03} color={'gray'} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const CharacterScreen = ({route, navigation}) => {
  const [originalCharacterList, setOriginalCharacterList] = useState();
  const [characterList, setCharacterList] = useState();
  const [info, setInfo] = useState();
  const [api, setApi] = useState(
    'https://rickandmortyapi.com/api/character?page=1',
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCharacters(api);
        setOriginalCharacterList(data.results); // Orijinal veri setini set ediyoruz
        setCharacterList(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error('Veri çekme sırasında bir hata oluştu: ', error);
      }
    };

    if (api !== null) {
      fetchData();
    } else {
      Alert.alert('Uyarı !', 'Görüntülenecek başka sayfa yok.');
    }
  }, [api]);

  const nextPage = () => {
    setApi(info.next);
  };

  const previousPage = () => {
    setApi(info.prev);
  };

  const handleSearch = text => {
    setSearchText(text);
    const filtered = originalCharacterList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setCharacterList(filtered);
  };

  const findCurrentPageNumber = api => {
    if (api !== null) {
      const pageNumber = parseInt(api.match(/page=(\d+)/)[1], 10);
      return pageNumber;
    }
  };
  const navigateCharacterList = () => {
    navigation.navigate('Favorites');
  };

  return (
    <View style={styles.container}>
      <Pagination
        next={nextPage}
        prev={previousPage}
        page={info?.pages}
        count={info?.count}
        pageCurrent={findCurrentPageNumber(api)}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search characters"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <TouchableWithoutFeedback onPress={navigateCharacterList}>
        <View style={styles.favoritesButton}>
          <Text style={styles.favoritesText}>Go Favorites List</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.charactersContainer}>
        {characterList && (
          <FlatList
            data={characterList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CharacterCard item={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={SeparatorComponent}
          />
        )}
      </View>
    </View>
  );
};

export default CharacterScreen;

const H = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'gray',
  },
  cardContainer: {
    width: 75,
    height: 75,
    marginBottom: H * 0.01,
    alignItems: 'center',
  },
  charactersContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  characterName: {
    color: 'orange',
    marginTop: H * 0.01,
    fontWeight: 'bold',
    letterSpacing: 1,
    width: '100%',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  card: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: H * 0.02,
    padding: H * 0.01,
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
  favoritesButton: {
    backgroundColor: '#1C1C1E',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: H * 0.01,
  },
  favoritesText: {
    color: 'orange',
  },
});
