const getNextArtist = require('./getNextArtist')
const filterArtists = require('./filtersArtists/filterArtists')
const addDataAlbumIdForNotListenedTracks = require('./addDataAlbumIdForNotListenedTracks')
const addTracksToYandexMusic = require('./addTracksToYandexMusic')
const listenedTracksController = require('./listenedTracksController')

async function artistsProcessing() {

    let artistData = await getNextArtist()
    /*console.log("Check artist = ", `https://music.yandex.ru/artist/${artistData.artist.id}`)*/

    artistData = filterArtists.filterByYandexMusicUsersLiked(artistData)
    /*console.log("artist banned By UsersLiked")*/
    if(!artistData) {
        return stopCurrentArtistProcessing()
    }

    artistData = filterArtists.filterByYandexMusicGenres(artistData)
    if (!artistData) {
        /*console.warn ( "artist banned By YandexMusic Genres" )*/
        return stopCurrentArtistProcessing()
    }

    artistData = filterArtists.filterByListenedTracks(artistData, listenedTracksController)
    if(!artistData) {
        return stopCurrentArtistProcessing()
    }

    artistData = await filterArtists.filterByLastFmGenres(artistData)
    if(!artistData) {
        /*console.warn ( "artist banned By LastFmGenres" )*/
        return stopCurrentArtistProcessing()
    }

    artistData = await addDataAlbumIdForNotListenedTracks(artistData)

    const resultAdded = await addTracksToYandexMusic(artistData.notListenedTracksWithAlbums)
    console.log("Result added tracks: ", resultAdded)

    return stopCurrentArtistProcessing()
}

function stopCurrentArtistProcessing() {
    return artistsProcessing()
}

module.exports = artistsProcessing;