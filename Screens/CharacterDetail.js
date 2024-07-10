import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CharacterDetail = ({route}) => {
  const {characterDetails} = route.params;

  const ChaaracterInfo = props => {
    return (
      <View style={styles.card}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <FontAwesome name={props.icon} size={H * 0.03} color={'orange'} />
          <Text style={styles.text}>{props.header}</Text>
        </View>

        <Text style={[styles.text, {color: 'orange'}]}>{props.text}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{display: 'flex', backgroundColor: 'black'}}>
        <Text style={[styles.text, {fontSize: H * 0.04, padding: H * 0.01}]}>
          {characterDetails.name}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: characterDetails.image}} style={styles.image} />
      </View>
      <View style={styles.characterInfo}>
        <Text style={[styles.text, {fontSize: H * 0.04, padding: H * 0.01}]}>
          Info
        </Text>
        <ChaaracterInfo
          text={characterDetails.species}
          header="Species"
          icon="paw"
        />
        <ChaaracterInfo
          text={characterDetails.gender}
          header="Gender"
          icon="user"
        />
        <ChaaracterInfo
          text={characterDetails.status}
          header="Status"
          icon="heart"
        />
        <ChaaracterInfo
          text={characterDetails.location.name}
          header="Location"
          icon="map"
        />
        <ChaaracterInfo
          text={characterDetails.origin.name}
          header="Origin"
          icon="arrow-up"
        />
      </View>
    </View>
  );
};

export default CharacterDetail;

const H = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    width: '100%',
    height: H * 0.3,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  characterInfo: {
    backgroundColor: 'black',
    display: 'flex',
    height: '100%',
  },
  text: {
    color: 'white',
  },
  card: {
    display: 'flex',
    backgroundColor: '#1C1C1E',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: H * 0.02,
    marginBottom: 1.5,
  },
});
