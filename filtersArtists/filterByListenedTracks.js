const { howManyTracksAdd } = require('../settings/settings')

function filterByListenedTracks(artistData, listenedTracksController) {

    const tracksForCheck = artistData.trackIds.slice(0, howManyTracksAdd)
    const onlyNotListenedTracks = listenedTracksController.getOnlyNotListenedTracks(tracksForCheck)

    if (onlyNotListenedTracks.length === 0) {
        return null
    } else {
        artistData.notListenedTracks = onlyNotListenedTracks
        return artistData
    }
}

module.exports = filterByListenedTracks;

