import { combineReducers } from "redux";

import navReducer from "./nav.reducer";
import { GENRES_REDUCER, GENRE_SOUNDS_REDUCER } from "bin/modules/home/reducers";


export default combineReducers({
  nav : navReducer,
  genres : GENRES_REDUCER,
  sounds : GENRE_SOUNDS_REDUCER
});