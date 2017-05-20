const CONFIG =  {

  FMA : {
    apiKey: "KUC6IU4SGXXY11AP",
    fetchLimit: 50,
    dataFormat : "json",
    protocol: "https",
    host : "freemusicarchive.org",
    get filesHost() {
     return `${this.protocol}://files.${this.host}`;
    },
    get apiGetUrl() {
      return `${this.protocol}://${this.host}/api/get`;
    },
    getGenresUrl(pageNumber = 0) {
      return `${this.apiGetUrl}/genres.${this.dataFormat}?api_key=${this.apiKey}&limit=${this.fetchLimit}&page=${pageNumber}`;
    },
    getGenreSoundsUrl(genreId, pageNumber = 0) {
      return `${this.apiGetUrl}/tracks.${this.dataFormat}?api_key=${this.apiKey}&genre_id=${genreId}&limit=${this.fetchLimit}&page=${pageNumber}`;
    }

  }



};

export default CONFIG;


//https://freemusicarchive.org/api/get/tracks.json?api_key=KUC6IU4SGXXY11AP&genre_id=12

//https://freemusicarchive.org/api/get/genres.json?api_key=KUC6IU4SGXXY11AP

//genre rock id = 12

// track file  music/Music_for_Video/Mscaras/Mscara_vs_Mscara/Mscaras_-_05_-_NewYorican.mp3

// full music file url - https://files.freemusicarchive.org/music/Music_for_Video/Mscaras/Mscara_vs_Mscara/Mscaras_-_05_-_NewYorican.mp3