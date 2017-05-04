import _unionBy from "lodash/unionBy";

import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
  parents : [],
  children : [],
  pending : false,
  error : null
};

/**
 * split a raw genres dataset to parent genres and children
 * @param genresList
 * @returns {{children, parents}}
 */
function splitGenresToParentAndChild(genresList) {
  let children = [];
  let parents = [];

    genresList.forEach(genreItem => {
      if (!genreItem.genre_parent_id) {
        parents.push(genreItem);
      } else {
        children.push(genreItem);
      }
    });


    const UNIQUE_MARKER = "genre_handle";

  return {
    children : _unionBy(children, UNIQUE_MARKER),
    parents : _unionBy(parents, UNIQUE_MARKER)
  };
}

const genres = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENRE_FETCH_DATA_INIT:
      return { ...state, pending : action.meta.pending };
      break;
    case actionTypes.GENRE_FETCH_DATA_FAIL:
      return { ...state, pending : action.meta.pending };
      break;
    case actionTypes.GENRE_FETCH_DATA_ERROR:
      return { ...state, pending : action.meta.pending, error : action.meta.error };
      break;
    case actionTypes.GENRE_FETCH_DATA_SUCCESS:
      const GENRES_COLLECTION = splitGenresToParentAndChild(action.payload.data);
      return  { ...state,  parents : GENRES_COLLECTION.parents
              , children : GENRES_COLLECTION.children, pending : action.meta.pending };
      break;
    default:
      return state;
      break;
  }
};

export default genres