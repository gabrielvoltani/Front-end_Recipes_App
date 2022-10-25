import {
  requestApiDrinks,
  requestApiListCategoriesDrinks } from '../../services/apiDrinks';
import {
  requestApiMeals,
  requestApiListCategoriesMeals } from '../../services/apiMeals';

export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_MEALS = 'GET_MEALS';
export const GET_LIST_CATEGORIES_MEALS = 'GET_LIST_CATEGORIES_MEALS';
export const GET_LIST_CATEGORIES_DRINKS = 'GET_LIST_CATEGORIES_DRINKS';
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

export const getListCategoriesMeals = (payload) => ({
  type: GET_LIST_CATEGORIES_MEALS,
  payload,
});

export const getListCategoriesDrinks = (payload) => ({
  type: GET_LIST_CATEGORIES_DRINKS,
  payload,
});

export const thunkRequestMeals = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiMeals = await requestApiMeals();
  const responseApiListCategoriesMeals = await requestApiListCategoriesMeals();
  dispatch(getListCategoriesMeals(responseApiListCategoriesMeals));
  return dispatch(getMeals(responseApiMeals));
};

export const thunkRequestDrinks = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiDrinks = await requestApiDrinks();
  const responseApiListCategoriesDrinks = await requestApiListCategoriesDrinks();
  dispatch(getListCategoriesDrinks(responseApiListCategoriesDrinks));
  return dispatch(getDrinks(responseApiDrinks));
};
