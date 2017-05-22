import RNFetchBlob from 'react-native-fetch-blob'

import Config from "bin/config";

import * as actionTypes from "./types";

function fetchDataInitAction(trackId) {
  return {
    type : actionTypes.SOUND_DOWNLOAD_INIT,
    payload : {
      data : trackId
    },
    meta : {
      pending : true,
      error : null
    }
  }
}

function fetchDataSuccessAction(data) {
  console.log("-- data --");
  return {
    type : actionTypes.SOUND_DOWNLOAD_SUCCESS,
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
    type : actionTypes.SOUND_DOWNLOAD_FAIL,
    payload : {
      data : null
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
      data : null
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
      data : null
    },
    meta : {
      pending : false,
      error : e
    }
  }
}


function downloadSound( soundInfo ) {
  return RNFetchBlob
    .config({
      fileCache : true,
      // by adding this option, the temp files will have a file extension
      appendExt : 'mp3',
      path : `/sdcard/Music/${soundInfo.track_title}.mp3`
    })
    .fetch('GET', `https://files.freemusicarchive.org/${soundInfo.track_file}`, {
      "Content-Type" : "application/octet-stream"
    })
};



let soundCounter = 0;
let endPoint;
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
export function  downloadSoundAction(trackData, playListEndPoint) {
  endPoint = --playListEndPoint;
  return dispatch => {
    console.log("fetchSoundInfoAction, trackId => ", trackData.track_id);

    dispatch(fetchDataInitAction(trackData.track_id));


      downloadSound(playlist[soundCounter])
        .progress({ count : 10 }, (received, total) => {
          console.log('progress', received / total);
          dispatch(soundDownloadProgressChange(trackData.track_id, Math.ceil(received / total) ));
        })
        .then((res) => {

          RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}]);
          console.log("ress ====>>", res);
          // the temp file path with file extension `png`
          console.log(`The file - №${soundCounter} saved to `, res.path());
          soundCounter++;

          if (soundCounter < endPoint) {
            downloadSound(playlist[soundCounter]);
          } else {
            console.info("PLAYLIST LOADED");
          }

        });

  };

};
