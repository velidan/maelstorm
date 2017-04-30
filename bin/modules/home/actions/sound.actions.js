import * as actionTypes from "./types";

function fetchDataInitAction() {
  return {
    type : actionTypes.GENRE_FETCH_DATA_INIT,
    payload : {
      data : null,
      pending : true,
      error : null
    }
  }
}

function fetchDataSuccessAction(data) {
  console.log("-- data --");
  return {
    type : actionTypes.GENRE_FETCH_DATA_SUCCESS,
    payload : {
      data : data,
      pending : false,
      error : null
    }
  }
}

function fetchDataFailAction() {

  return {
    type : actionTypes.GENRE_FETCH_DATA_FAIL,
    payload : {
      data : null,
      pending : false,
      error : null
    }
  }
}

function fetchDataErrorAction(e) {

  return {
    type : actionTypes.GENRE_FETCH_DATA_ERROR,
    payload : {
      data : null,
      pending : false,
      error : e
    }
  }
}

// works
export function  fetchGenreSoundsAction(genreId) {
  return dispatch => {
    console.log("fetch sound by genre");

    dispatch(fetchDataInitAction());

    return fetch(`https://files.freemusicarchive.org/music/Music_for_Video/Mscaras/Mscara_vs_Mscara/Mscaras_-_05_-_NewYorican.mp3`,{
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream',
        'Content-Type': 'application/octet-stream',
      }})
      .then(responseJson => {
        console.log("responseJson => ", responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };

};
