import { GET_DRINKS, GET_MEALS, IS_REQUESTING } from '../Actions';

const INITIAL_STATE = {
  isRequesting: false,
  drinks: [],
  meals: [],
};

function recipes(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case IS_REQUESTING:
    return {
      ...state,
      isRequesting: true,
    };
  case GET_DRINKS:
    return {
      ...state,
      drinks: payload,
    };
  case GET_MEALS:
    return {
      ...state,
      meals: payload,
      isRequesting: false,
    };
  default:
    return state;
  }
}
export default recipes;
