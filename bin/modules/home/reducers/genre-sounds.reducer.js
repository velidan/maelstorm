//import _unionBy from "lodash/unionBy";

import * as actionTypes from "../actions/types";

/**
 * A genre model
 *
 * @typedef { Object } Genre
 *
 * @property { string } genre_id
 * @property { string } genre_title
 * @property { string } genre_url
 */

/**
 * A track model
 *
 * @typedef { Object } Track
 *
 * @property { string } album_id - a track album id
 * @property { string } album_title - a track album title
 * @property { string } album_url - a track album url
 * @property { string } artist_id - a track artist id
 * @property { string } artist_name - a track artist name
 * @property { string } artist_url - a track artist url
 * @property { string } artist_website - a track artist website
 * @property { string } license_image_file - a track license img file
 * @property { string } license_image_file_large - a track license img file big
 * @property { string } license_parent_id - a track license parent id
 * @property { string | null } license_parent_id - a track license parent id
 * @property { string } license_title - a track license title
 * @property { string } license_url - a track license url
 * @property { string[] } tags - a track tags
 * @property { string } track_bit_rate - a track bit rate
 * @property { string } track_comments - a track comments
 * @property { string | null } track_composer
 * @property { string | null } track_copyright_c
 * @property { string | null } track_copyright_p
 * @property { string } track_date_created
 * @property { string | null } track_date_recorded
 * @property { string | null } track_disc_number
 * @property { string } track_duration
 * @property { string } track_explicit
 * @property { string | null } track_explicit_notes
 * @property { string | null } track_favorites
 * @property { string } track_file - a track file url
 * @property { Genre[] } track_genres
 * @property { string } track_id
 * @property { string } track_image_file - a track image file url
 * @property { string | null } track_information
 * @property { string } track_instrumental
 * @property { string } track_interest
 * @property { string | null } track_language_code
 * @property { string } track_listens - how much people have listened this music
 * @property { string | null } track_lyricist
 * @property { string } track_number
 * @property { string | null } track_publisher
 * @property { string } track_title
 * @property { string } track_url - a track fma track url
 *
 * @property { boolean } loading - an indicator of the track loading state
 * @property { number } loadingProgress - a progress of loading
 * @property { boolean } ready - if track was loaded
 * @property { boolean } loadedFilePath - the loaded file path
 */



/**
 *
 * @type {{
   * playlist: Array<Track>,
   * banned: Array<string> ( banned tracks id )
   * favorites: Array<Track>
   * pending: boolean,
   * error: null
 * }}
 */
const INITIAL_STATE = {
  playlist : [],
  banned : [],
  favorites : [],
  pending : false,
  error : null
};


function getRandomTrackSet(min, max, randomItemCount, trackSet) {
  let randomIdSet = [];
  let resultSet = [];



  function core() {
    if ( randomIdSet.length < randomItemCount ) {
      const randomId = Math.floor(Math.random() *  max) + min;
      const trackId = trackSet[randomId].track_id;

      if (!randomIdSet.includes(trackId) ) {
        randomIdSet.push(trackId);
        resultSet.push({ ...trackSet[randomId], loading : false, ready : false, loadingProgress : 0  });
      }

      core()
    }
  }

  core();

  return resultSet;
}




function soundDownloadHandler(playlist, action ) {
  return playlist.map(trackData => {
    let res = trackData;

    if (trackData.track_id === action.payload.soundId) {
      res = { ...trackData,
        loading : action.meta.pending,
        soundId : action.payload.soundId,
        loadingProgress : action.payload.progressValue,
        ready : action.payload.ready
      }
    }
    return res;
  });
}




const genres = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENRE_SOUNDS_FETCH_DATA_INIT:
      return { ...state, pending : action.meta.pending };
      break;
    case actionTypes.GENRE_SOUNDS_FETCH_DATA_FAIL:
      return { ...state, pending : action.meta.pending };
      break;
    case actionTypes.GENRE_SOUNDS_FETCH_DATA_ERROR:
      return { ...state, pending : action.meta.pending, error : action.meta.error };
      break;
    case actionTypes.GENRE_SOUNDS_FETCH_DATA_SUCCESS:
      const soundsSet = action.payload.data;
      return { ...state,
        pending : action.meta.pending,
        playlist : getRandomTrackSet(0 , soundsSet.length, action.payload.playlistTrackCount, soundsSet)
      };
      break;

    case actionTypes.SOUND_DOWNLOAD_INIT:
      return { ...state, playlist : soundDownloadHandler(state.playlist, action)  };
      break;
    case actionTypes.SOUND_DOWNLOAD_SUCCESS:

    function uza(playlist, action ) {
      return playlist.map(trackData => {
        let res = trackData;

        if (trackData.track_id === action.payload.soundId) {
          res = { ...trackData,
            loading : action.meta.pending,
            soundId : action.payload.soundId,
            loadedFilePath : action.payload.soundPath,
            loadingProgress : action.payload.progressValue,
            ready : action.payload.ready
          }
        }
        return res;
      });
    }


      //return { ...state, playlist : soundDownloadHandler(state.playlist, action)  };
      return { ...state, playlist : uza(state.playlist, action)  };
      break;
    case actionTypes.SOUND_DOWNLOAD_PROGRESS_CHANGE:
      console.log("SOUND_DOWNLOAD_PROGRESS_CHANGE");
      return { ...state, playlist : soundDownloadHandler(state.playlist, action)  };
    case actionTypes.SOUND_DOWNLOAD_FAIL:
      return { ...state, playlist : soundDownloadHandler(state.playlist, action)  };
    case actionTypes.SOUND_DOWNLOAD_ERROR:
      return { ...state, playlist : soundDownloadHandler(state.playlist, action)  };
    default:
      return state;
      break;
  }
};

export default genres