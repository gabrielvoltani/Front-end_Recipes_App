import {
  GET_DRINKS,
  GET_MEALS,
  IS_REQUESTING,
  GET_LIST_CATEGORIES_DRINKS,
  GET_LIST_CATEGORIES_MEALS,
  IS_FILTERING,
  ALL_MEALS,
  ALL_DRINKS,
  GET_MEALS_FILTRED,
  GET_DRINKS_FILTRED,
} from '../actions';

const INITIAL_STATE = {
  isRequesting: false,
  drinks: [],
  drinksWhithoutFilters: [],
  mealsWhithoutFilters: [],
  meals: [],
  categoriesMeals: [],
  categoriesDrinks: [],
  isFiltering: false,
  recipeDrinkInProgress: {},
  recipeMealInProgress: {},
};

function recipes(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case IS_REQUESTING:
    return { ...state, isRequesting: true };
  case GET_LIST_CATEGORIES_DRINKS:
    return {
      ...state, categoriesDrinks: payload, isRequesting: false,
    };
  case GET_LIST_CATEGORIES_MEALS:
    return {
      ...state, categoriesMeals: payload, isRequesting: false,
    };
  case GET_DRINKS:
    return {
      ...state, drinks: payload, isRequesting: false,
    };
  case GET_MEALS:
    return {
      ...state, meals: payload, isRequesting: false,
    };
  case IS_FILTERING:
    return {
      ...state, isFiltering: !state.isFiltering };
  case ALL_MEALS:
    return {
      ...state, mealsWhithoutFilters: payload, isRequesting: false,
    };
  case ALL_DRINKS:
    return {
      ...state, drinksWhithoutFilters: payload, isRequesting: false,
    };
  case GET_MEALS_FILTRED:
    return { ...state, meals: payload };
  case GET_DRINKS_FILTRED:
    return { ...state, drinks: payload };
  default:
    return state;
  }
}

export default recipes;
