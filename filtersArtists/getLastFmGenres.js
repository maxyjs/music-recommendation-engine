const cheerio = require("cheerio")
const axios = require('axios')

async function getLastFmGenres(nameArtist) {

    try {
        const dataLastFM = await getDataLastFM(nameArtist)

        const artistGenres = parseDataLastFM(dataLastFM)

        return artistGenres
    }
    catch (ERR_parseDataLastFM) {
        console.log ( "ERR_parseDataLastFM: ", ERR_parseDataLastFM )
        return []
    }

    async function getDataLastFM(nameArtist) {

        const query = encodeUri(nameArtist)

        try {
            const { data } = await axios.get(`https://www.last.fm/music/${query}`)
            return data
        }
        catch (error) {
            if (error.response !== undefined) {
                console.error("AXIOS ERROR [error.response.status]= ", error.response.status)
            } else {
                console.error("[getDataLastFM] AXIOS ERROR GLOBAL = ", error)
            }
        }
    }

    function parseDataLastFM(dataLastFM) {

        const $ = cheerio.load( dataLastFM )
        const genresLastFM =((JSON.parse($("#tlmdata").attr('data-tealium-data'))).tag).split(',')
        if(genresLastFM[0] === '') return []
        return genresLastFM
    }

    function encodeUri(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`)
    }
}

module.exports = getLastFmGenres;