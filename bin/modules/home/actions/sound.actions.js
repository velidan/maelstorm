import RNFetchBlob from 'react-native-fetch-blob'

import Config from "bin/config";

import * as actionTypes from "./types";

function fetchDataInitAction(trackId) {
  return {
    type : actionTypes.SOUND_DOWNLOAD_INIT,
    payload : {
      data : null,
      soundId : trackId,
      progressValue : 0,
      ready : false
    },
    meta : {
      pending : true,
      error : null
    }
  }
}

function fetchDataSuccessAction(soundId) {
  return {
    type : actionTypes.SOUND_DOWNLOAD_SUCCESS,
    payload : {
      data : null,
      soundId : soundId,
      progressValue : 100,
      ready : true
    },
    meta : {
      pending : false,
      error : null
    }
  }
}

function fetchDataFailAction() {

  return {
    type : actionTypes.SOUND_DOWNLOAD_FAIL,
    payload : {
      data : null,
      soundId : null,
      progressValue : 0,
      ready : false
    },
    meta : {
      pending : false,
      error : null
    }
  }
}

function soundDownloadProgressChange(soundId, progressValue) {
  return {
    type : actionTypes.SOUND_DOWNLOAD_PROGRESS_CHANGE,
    payload : {
      data : null,
      soundId : soundId,
      progressValue : progressValue,
      ready : false
    },
    meta : {
      pending : true,
      error : null
    }
  }
}

function fetchDataErrorAction(e) {

  return {
    type : actionTypes.SOUND_DOWNLOAD_ERROR,
    payload : {
      data : null,
      soundId : null,
      progressValue : 0,
      ready : false
    },
    meta : {
      pending : false,
      error : e
    }
  }
}




//let soundCounter = 0;
//let endPoint;
//const playlist = this.props.sounds.playlist;



// let core = () => {
//   this._downloadSound(playlist[soundCounter])
//     .then((res) => {
//
//       RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}]);
//       console.log("ress ====>>", res);
//       // the temp file path with file extension `png`
//       console.log(`The file - №${soundCounter} saved to `, res.path());
//       soundCounter++;
//
//       if (soundCounter < playlistEndPoint) {
//         core();
//       } else {
//         console.info("PLAYLIST LOADED");
//       }
//
//     });
// };
//
// core();

// works
export function  downloadSoundAction(trackData) {
  //endPoint = --playListEndPoint;
  return dispatch => {
    console.log("fetchSoundInfoAction, trackId => ", trackData.track_id);

    dispatch(fetchDataInitAction(trackData.track_id));


    return RNFetchBlob
        .config({
          fileCache : true,
          // by adding this option, the temp files will have a file extension
          appendExt : 'mp3',
          path : `/sdcard/Music/${trackData.track_title}.mp3`
        })
        .fetch('GET', `https://files.freemusicarchive.org/${trackData.track_file}`, {
          "Content-Type" : "application/octet-stream"
        })
        .progress({ count : 10 }, (received, total) => {
          dispatch(soundDownloadProgressChange(trackData.track_id, Math.ceil(received / total * 100 )));
        })
        .then((res) => {
          dispatch(fetchDataSuccessAction(trackData.track_id));
          RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}]);
          console.log("ress ====>>", res);
          // the temp file path with file extension `png`
          console.log(`The file - ${trackData.track_title} saved to `, res.path());

        });

  };

};
