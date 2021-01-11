const cacheController = require('./cacheController')

const tor_axios = require('tor-axios')
const tor = tor_axios.torSetup({
    ip: 'localhost',
    port: 9050,
})

tor.get('http://api.ipify.org').then(({ data }) => {
    let currentIP = data
    console.log('\x1b[33m%s\x1b[0m', "Current ip: ", currentIP)
})

async function getNextArtist() {

    do {
        try {
            var id = cacheController.getNextId()

            var { data } = await tor.get(`https://music.yandex.ru/handlers/artist.jsx?artist=${id}`)

            // Sometimes the API returns random artists
            if(data && data.artist.id && data.artist.id != id) {
                data = null
            }

        }
        catch (e) {}
    } while (!data)

    return data
}

module.exports = getNextArtist;






