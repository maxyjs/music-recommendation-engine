const axios = require('axios')

async function getAlbumId(id) {

    const url = `http://music.yandex.ru/handlers/track.jsx?track=${id}`

    try {
        const { data } = await axios.get(url)
        const albumId = data.track.albums[0].id
        return {
            id,
            albumId
        }
    }
    catch (error) {
        console.warn (error)
    }
}

async function addDataAlbumIdForNotListenedTracks(artistData) {

    const { notListenedTracks } = artistData

    const newData = await Promise.all(notListenedTracks.map(getAlbumId))

    artistData.notListenedTracksWithAlbums = newData

    return artistData
}

module.exports = addDataAlbumIdForNotListenedTracks;

// Example: [{id:'20599729', albumId:'2347459'}]