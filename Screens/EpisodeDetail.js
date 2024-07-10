import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';

const CharacterCard = ({url, navigation}) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(url);
        setCharacter(response.data);
      } catch (error) {
        console.log('Bir hata oluştu!', error);
      }
    };

    fetchCharacterDetails();
  }, [url]);

  if (!character) {
    return <Text>Loading...</Text>;
  }

  const handleClick = name => {
    navigation.navigate('CharacterDetail', {characterDetails: character});
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(character.id)}>
      <View style={styles.card}>
        <View key={character.id} style={styles.cardContainer}>
          <Image source={{uri: character.image}} style={styles.image} />
        </View>
        <Text style={styles.characterName}>{character.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const EpisodeDetail = ({route, navigation}) => {
  const {episodeData} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.headerInfoContainer}>
          <Text style={styles.headerInfoText}>Info</Text>

          <View style={styles.infoDetailContainer}>
            <View style={styles.infoArea}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <FontAwesome name="info" size={H * 0.02} color={'orange'} />
                <Text style={styles.headerTexts}>Name</Text>
              </View>
              <Text style={styles.headerDataText}>{episodeData.name}</Text>
            </View>
            <View style={styles.infoArea}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <FontAwesome name="calendar" size={H * 0.02} color={'orange'} />
                <Text style={styles.headerTexts}>Air Date</Text>
              </View>

              <Text style={styles.headerDataText}>{episodeData.air_date}</Text>
            </View>
            <View style={styles.infoArea}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <FontAwesome name="book" size={H * 0.02} color={'orange'} />
                <Text style={styles.headerTexts}>Episode</Text>
              </View>
              <Text style={styles.headerDataText}>{episodeData.episode}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.headerInfoText}>
            Characters ({episodeData.characters.length})
          </Text>
        </View>
      </View>
      <View style={styles.charactersContainer}>
        <FlatList
          data={episodeData.characters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CharacterCard url={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={SeparatorComponent}
        />
      </View>
    </View>
  );
};

export default EpisodeDetail;

const H = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
  },
  infoContainer: {},
  infoDetailContainer: {},
  infoArea: {
    display: 'flex',
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: H * 0.01,
    marginBottom: H * 0.001,
  },
  headerTexts: {color: 'white', fontWeight: 'bold'},
  headerDataText: {color: 'orange', letterSpacing: 2},
  charactersContainer: {
    display: 'flex',
    flex: 1,
  },
  headerInfoContainer: {
    padding: H * 0.01,
  },
  headerInfoText: {
    color: 'white',
    fontSize: H * 0.02,
    fontWeight: 'bold',
    marginBottom: H * 0.01,
    padding: H * 0.015,
    textTransform: 'uppercase',
  },
  cardContainer: {
    width: 75,
    height: 75,
    marginBottom: H * 0.01,
    alignItems: 'center',
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
    width: '100%',
    backgroundColor: '#1C1C1E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: H * 0.02,
    padding: H * 0.01,
  },
});
