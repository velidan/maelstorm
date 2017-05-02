import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
  rawData : null,
  pending : false
};

const genres = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENRE_FETCH_DATA_INIT:
      return { ...state, pending : action.meta.pending };
      break;
    case actionTypes.GENRE_FETCH_DATA_FAIL:
      console.log(action);
      return state;
      break;
    case actionTypes.GENRE_FETCH_DATA_ERROR:
      console.log(action);
      return state;
      break;
    case actionTypes.GENRE_FETCH_DATA_SUCCESS:
      console.log(action);
      return state;
      break;
    default:
      return state;
      break;
  }
};

export default genres