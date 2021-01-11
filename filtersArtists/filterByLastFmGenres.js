const blackListGenresLastFm = require('../blackLists/blackListGenresLastFm')
const getLastFmGenres = require('./getLastFmGenres')

async function filterByLastFmGenres (artistData) {

    artistData.genresLastFm = await getLastFmGenres(artistData.artist.name)

    if(artistData.genresLastFm && artistData.genresLastFm.length === 0) return artistData;

    if( detectArtistGenresContainsBannedGenres(artistData.genresLastFm, blackListGenresLastFm) ) {
        return null
    }

    return artistData

    function detectArtistGenresContainsBannedGenres(artistGenres, bannedGenres){
        return artistGenres.some(artistGenre => bannedGenres[artistGenre])
    }
}

module.exports = filterByLastFmGenres;