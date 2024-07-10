import {View, Text, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import HomeScreen from './Screens/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from './utils/fetchUtils';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EpisodeDetail from './Screens/EpisodeDetail';
import CharacterDetail from './Screens/CharacterDetail';
import CharacterScreen from './Screens/CharacterScreen';
import FavoritesScreen from './Screens/FavoritesScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Episodes'}}
        />
        <Stack.Screen
          name="EpisodesDetail"
          component={EpisodeDetail}
          options={{title: 'Episode Detail'}}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetail}
          options={{title: 'Character Detail'}}
        />
        <Stack.Screen
          name="Characters"
          component={CharacterScreen}
          options={{title: 'Characters'}}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{title: 'Favorites'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
