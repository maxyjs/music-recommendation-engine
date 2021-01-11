const filterByYandexMusicUsersLiked = require('./filterByYandexMusicUsersLiked')
const filterByYandexMusicGenres = require('./filterByYandexMusicGenres')
const filterByListenedTracks = require('./filterByListenedTracks')
const filterByLastFmGenres = require('./filterByLastFmGenres')

const filterArtists = {
    filterByYandexMusicUsersLiked,
    filterByYandexMusicGenres,
    filterByListenedTracks,
    filterByLastFmGenres
}

module.exports = filterArtists;
