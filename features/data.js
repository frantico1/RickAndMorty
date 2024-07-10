import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
  data: [],
  charactersData: [],
  isLoading: false,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  api: 'https://rickandmortyapi.com/api/episode?page=1',
};

export const favoritesSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newFavorite = action.payload;

      if (state.favorites.length < 10) {
        state.favorites.push(newFavorite);
        AsyncStorage.setItem(
          'favorites',
          JSON.stringify(state.favorites),
        ).catch(err => {
          console.error('Favorileri kaydederken hata oluştu:', err);
        });
      } else {
        Alert.alert(
          'Limit Aşıldı',
          'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.',
        );
      }
    },
    removeFavorite: (state, action) => {
      const favoriteIdToRemove = action.payload;

      state.favorites = state.favorites.filter(
        favorite => favorite !== favoriteIdToRemove,
      );

      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites)).catch(
        err => {
          console.error('Favorileri silerekn hata oluştu:', err);
        },
      );
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    setPrevPage: (state, action) => {
      state.prevPage = action.payload;
    },
    setApi: (state, action) => {
      state.api = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setData,
  setFavorites,
  setIsLoading,
  setCurrentPage,
  setNextPage,
  setPrevPage,
  setApi,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const loadFavorites = () => async dispatch => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  } catch (error) {
    console.error('Favorileri yüklerken hata oluştu:', error);
  }
};
