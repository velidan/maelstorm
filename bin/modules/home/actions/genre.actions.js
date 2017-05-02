import Config from "bin/config";
import * as actionTypes from "./types";

function fetchDataInitAction() {
  return {
    type : actionTypes.GENRE_FETCH_DATA_INIT,
    payload : {
      data : null
    },
    meta : {
      pending : true,
      error : null
    }
  }
}

function fetchDataSuccessAction(data) {
  console.log("-- data --", data);
  return {
    type : actionTypes.GENRE_FETCH_DATA_SUCCESS,
    payload : {
      data : data
    },
    meta : {
      pending : false,
      error : null
    }
  }
}

function fetchDataFailAction() {

  return {
    type : actionTypes.GENRE_FETCH_DATA_FAIL,
    payload : {
      data : null
    },
    meta : {
      pending : false,
      error : null
    }
  }
}

function fetchDataErrorAction(e) {

  return {
    type : actionTypes.GENRE_FETCH_DATA_ERROR,
    payload : {
      data : null
    },
    meta : {
      pending : false,
      error : e
    }
  }
}

// works


// a genres dataset
let dataset = [];
let pageCounter = 0;

function fetchGenreCore(page = pageCounter, dispatch) {
  return fetch(Config.FMA.getGenresUrl(page))
    .then((response) => response.json())
    .then(responseJson => {

      ++pageCounter;
      dataset = dataset.concat(responseJson.dataset);

      let res;

      if (pageCounter <= +responseJson.total_pages) {
        res = fetchGenreCore(...arguments);
      } else {
        dispatch(fetchDataSuccessAction(dataset));
        res = dataset;
      }

      return res;
    })
    .catch((error) => {
      console.error(error);
    });
}


export function  fetchGenreAction() {
  return dispatch => {
    console.log("fetch genre");

    dispatch(fetchDataInitAction());
    return fetchGenreCore(pageCounter, dispatch)

  };

};
