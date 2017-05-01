import * as actionTypes from "./types";

function fetchDataInitAction() {
  return {
    type : actionTypes.SOUND_INFO_FETCH_DATA_INIT,
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
    type : actionTypes.SOUND_INFO_FETCH_DATA_SUCCESS,
    payload : {
      data : data,
      pending : false,
      error : null
    }
  }
}

function fetchDataFailAction() {

  return {
    type : actionTypes.SOUND_INFO_FETCH_DATA_FAIL,
    payload : {
      data : null,
      pending : false,
      error : null
    }
  }
}

function fetchDataErrorAction(e) {

  return {
    type : actionTypes.SOUND_INFO_FETCH_DATA_ERROR,
    payload : {
      data : null,
      pending : false,
      error : e
    }
  }
}

// works
export function  fetchSoundInfoAction(trackId) {
  return dispatch => {
    console.log("fetchSoundInfoAction, trackId => ", trackId);

    dispatch(fetchDataInitAction());

    return fetch(`https://freemusicarchive.org/api/get/tracks.json?api_key=KUC6IU4SGXXY11AP&track_id=${trackId}`)
      .then((response) => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };

};
