import { combineReducers } from "redux";

import navReducer from "./nav.reducer";


export default combineReducers({
  nav: navReducer
});