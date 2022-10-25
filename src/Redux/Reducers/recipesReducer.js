import {
  GET_DRINKS,
  GET_MEALS,
  IS_REQUESTING,
  GET_LIST_CATEGORIES_DRINKS,
  GET_LIST_CATEGORIES_MEALS,
  REQUEST_FINISHED,
  IS_FILTERING,
} from '../Actions';

const INITIAL_STATE = {
  isRequesting: false,
  drinks: [],
  meals: [],
  categoriesMeals: [],
  categoriesDrinks: [],
  isFiltering: false,
};

function recipes(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case IS_REQUESTING:
    return {
      ...state,
      isRequesting: true,
    };
  case REQUEST_FINISHED:
    return {
      ...state,
      isRequesting: false,
    };
  case GET_LIST_CATEGORIES_DRINKS:
    return {
      ...state,
      categoriesDrinks: payload,
    };
  case GET_LIST_CATEGORIES_MEALS:
    return {
      ...state,
      categoriesMeals: payload,
    };
  case GET_DRINKS:
    return {
      ...state,
      drinks: payload,
      isRequesting: false,
    };
  case GET_MEALS:
    return {
      ...state,
      meals: payload,
      isRequesting: false,
    };
  case IS_FILTERING:
    return {
      ...state,
      isFiltering: !state.isFiltering,
    };
  default:
    return state;
  }
}
export default recipes;
