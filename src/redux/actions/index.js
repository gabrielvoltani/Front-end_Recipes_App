import {
  requestApiDrinks,
  requestApiListCategoriesDrinks,
  requestApiFilterByCategoryDrink,
} from '../../services/apiDrinks';
import {
  requestApiMeals,
  requestApiListCategoriesMeals,
  requestApiFilterByCategoryMeal,
} from '../../services/apiMeals';

export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_MEALS = 'GET_MEALS';
export const GET_LIST_CATEGORIES_MEALS = 'GET_LIST_CATEGORIES_MEALS';
export const GET_LIST_CATEGORIES_DRINKS = 'GET_LIST_CATEGORIES_DRINKS';
export const GET_MEALS_FILTERED_BY_CATEGORY = 'GET_MEALS_FILTER_BY_CATEGORY';
export const GET_DRINKS_FILTERED_BY_CATEGORY = 'GET_MEALS_FILTER_BY_CATEGORY';
export const IS_REQUESTING = 'IS_REQUESTING';
export const IS_FILTERING = 'IS_FILTERING';
export const ALL_MEALS = 'ALL_MEALS';
export const ALL_DRINKS = 'ALL_DRINKS';
export const GET_MEALS_FILTRED = 'GET_MEALS_FILTRED';
export const GET_DRINKS_FILTRED = 'GET_DRINKS_FILTRED';
export const GET_DRINK_IN_PROGRESS = 'GET_DRINK_IN_PROGRESS';
export const GET_MEAL_IN_PROGRESS = 'GET_MEAL_IN_PROGRESS';

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

export const getAllDrinks = (payload) => ({
  type: ALL_DRINKS,
  payload,
});

export const getMeals = (payload) => ({
  type: GET_MEALS,
  payload,
});

export const getAllMeals = (payload) => ({
  type: ALL_MEALS,
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

export const getMealsFilteredByCategory = (payload) => ({
  type: GET_MEALS_FILTERED_BY_CATEGORY,
  payload,
});

export const getDrinksFilteredByCategory = (payload) => ({
  type: GET_DRINKS_FILTERED_BY_CATEGORY,
  payload,
});

export const filtering = () => ({
  type: IS_FILTERING,
});

export const getMealsFiltred = (payload) => ({
  type: GET_MEALS_FILTRED,
  payload,
});

export const getDrinksFiltred = (payload) => ({
  type: GET_DRINKS_FILTRED,
  payload,
});

export const thunkRequestMeals = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiMeals = await requestApiMeals();
  const responseApiListCategoriesMeals = await requestApiListCategoriesMeals();
  dispatch(getListCategoriesMeals(responseApiListCategoriesMeals));
  dispatch(getAllMeals(responseApiMeals));
  return dispatch(getMeals(responseApiMeals));
};

export const thunkRequestDrinks = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiDrinks = await requestApiDrinks();
  const responseApiListCategoriesDrinks = await requestApiListCategoriesDrinks();
  dispatch(getListCategoriesDrinks(responseApiListCategoriesDrinks));
  dispatch(getAllDrinks(responseApiDrinks));
  return dispatch(getDrinks(responseApiDrinks));
};

export const thunkRequestApiFilterByCategoryDrink = (type) => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiFilteredDrinks = await requestApiFilterByCategoryDrink(type);
  return dispatch(getDrinks(responseApiFilteredDrinks));
};

export const thunkRequestApiFilterByCategoryMeal = (type) => async (dispatch) => {
  dispatch(isRequesting());
  const responseApiFilteredDrinks = await requestApiFilterByCategoryMeal(type);
  return dispatch(getMeals(responseApiFilteredDrinks));
};
