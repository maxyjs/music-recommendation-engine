const processController = require('./processController')
const listenedTracksController = require('./listenedTracksController')
const cacheController = require('./cacheController')
const artistsProcessing = require('./artistsProcessing')

async function main() {
    await processController.launchTor()
    await listenedTracksController.setListenedTracks()
    await cacheController.init()
    await artistsProcessing()
}

main().catch((error) => {
    throw new Error(error);
})