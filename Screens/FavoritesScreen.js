import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {removeFavorite} from '../features/data';
import axios from 'axios';

const {height: H, width: W} = Dimensions.get('window');

const FavoritesScreen = ({navigation}) => {
  const {favorites} = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const characterPromises = favorites.map(id =>
          axios.get(`https://rickandmortyapi.com/api/character/${id}`),
        );
        const responses = await Promise.all(characterPromises);
        const characterData = responses.map(response => response.data);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching character data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchCharacters();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  const handleRemoveFavorite = character => {
    Alert.alert(
      'Favori Karakteri Sil',
      `${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            dispatch(removeFavorite(character.id));
            setCharacters(prevCharacters =>
              prevCharacters.filter(char => char.id !== character.id),
            );
          },
        },
      ],
    );
  };

  const handleClick = character => {
    if (character) {
      navigation.navigate('CharacterDetail', {characterDetails: character});
    }
  };

  const renderFavoriteCharacter = ({item}) => {
    if (!item) return null;

    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => handleClick(item)}>
          <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.characterName}>
              {item.name || 'Isimsiz Karakter'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleRemoveFavorite(item)}>
          <FontAwesome name="trash" size={H * 0.03} color={'orange'} />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {characters.length > 0 ? (
        <FlatList
          data={characters}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavoriteCharacter}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.noFavoritesText}>
          No favorite characters added yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    padding: H * 0.01,
  },
  cardTouchable: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: W * 0.15,
    height: W * 0.15,
    borderRadius: (W * 0.15) / 2,
    marginRight: W * 0.03,
  },
  characterName: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: H * 0.02,
    flex: 1,
  },
  deleteButton: {
    padding: W * 0.02,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  noFavoritesText: {
    color: 'white',
    fontSize: H * 0.02,
    textAlign: 'center',
    marginTop: H * 0.03,
  },
});

export default FavoritesScreen;
