import {setCurrentPage} from '../features/data';

export const findCurrentPagenumber = (dispatch, api) => {
  const currentPageNumber = api.length - 1;
  dispatch(setCurrentPage(api[currentPageNumber]));
};
