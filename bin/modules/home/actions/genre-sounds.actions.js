import Config from "bin/config";
import * as actionTypes from "./types";

function fetchDataInitAction() {
  return {
    type : actionTypes.GENRE_SOUNDS_FETCH_DATA_INIT,
    payload : {
      data : null
    },
    meta : {
      pending : true,
      error : null
    }
  }
}

function fetchDataSuccessAction(data, playlistTrackCount) {
  console.log("-- data --");
  return {
    type : actionTypes.GENRE_SOUNDS_FETCH_DATA_SUCCESS,
    payload : {
      data : data,
      playlistTrackCount : playlistTrackCount
    },
    meta : {
      pending : false,
      error : null
    }
  }
}

function fetchDataFailAction() {

  return {
    type : actionTypes.GENRE_SOUNDS_FETCH_DATA_FAIL,
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
    type : actionTypes.GENRE_SOUNDS_FETCH_DATA_ERROR,
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
export function  fetchGenreSoundsAction(genreId, playlistTrackCount) {
  return dispatch => {
    console.log("fetch sounds by genre");

    dispatch(fetchDataInitAction());

    return fetch(Config.FMA.getGenreSoundsUrl(genreId))
      .then((response) => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(fetchDataSuccessAction(responseJson.dataset, playlistTrackCount));
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchDataErrorAction(error));
      });
  };

};
