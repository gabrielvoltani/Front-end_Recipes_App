import requestApiDrinks from '../../services/apiDrinks';
import requestApiMeals from '../../services/apiMeals';

export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_MEALS = 'GET_MEALS';
export const IS_REQUESTING = 'IS_REQUESTING';

export const isRequesting = () => ({
  type: IS_REQUESTING,
});

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const getDrinks = (payload) => ({
  type: GET_DRINKS,
  payload,
});

export const getMeals = (payload) => ({
  type: GET_MEALS,
  payload,
});

export const thunkRequestMeals = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApi = await requestApiMeals();
  return dispatch(getMeals(responseApi));
};

export const thunkRequestDrinks = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApi = await requestApiDrinks();
  return dispatch(getDrinks(responseApi));
};
