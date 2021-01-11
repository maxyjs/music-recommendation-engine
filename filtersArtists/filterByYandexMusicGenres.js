const blacklistGenresYandexMusic = require('../blackLists/blacklistGenresYandexMusic')

function filterByYandexMusicGenres(artistData) {

    const { artist } = artistData

    if(artist.genres && artist.genres.length === 0) return artistData

    if( detectArtistGenresContainsBannedGenres(artist.genres, blacklistGenresYandexMusic) ) {
        return null
    }

    return artistData

    function detectArtistGenresContainsBannedGenres(artistGenres, bannedGenres) {
        return artistGenres.some(artistGenre => bannedGenres[artistGenre])
    }
}

module.exports = filterByYandexMusicGenres;