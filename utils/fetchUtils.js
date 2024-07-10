import axios from 'axios';
import {setData, setIsLoading} from '../features/data';
import {findCurrentPagenumber} from './findCurrentPage';

export const fetchData = async (dispatch, api) => {
  dispatch(setIsLoading(true));

  try {
    const response = await axios.get(api);
    dispatch(setData(response.data));
    findCurrentPagenumber(dispatch, api);
  } catch (error) {
    console.error('Bir hata oluştu! ', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const fetchCharacterDetails = async api => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.log('Bir hata oluştu! ', error);
  }
};

export const fetchCharacters = async api => {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.log('Bir hata oluştu! ', error);
  }
};
