const axios = require('axios');
const { cookiesStr } = require("./cache/cookies")
const { UID } = require("./settings/settings.json")

const queryParams = {
    headers: {
        "Accept": "application/json; q=1.0, text/*; q=0.8, *!/!*; q=0.1",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "Cookie": cookiesStr,
        "Host": "music.yandex.ru",
        "Referer": "https://music.yandex.ru",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
        "X-Current-UID": UID,
        "X-Requested-With": "XMLHttpRequest",
        "X-Retpath-Y": "https%3A%2F%2Fmusic.yandex.ru"},

    withCredentials: true
}


module.exports = {

    listenedTracks: undefined,

    setListenedTracks: async function() {
        const tracks = await this.getListenedTracksFromYandexMusic()
        tracks ? this.listenedTracks = tracks : this.listenedTracks = []
    },

    getOnlyNotListenedTracks: function (trackIds) {
        const notListenedTracks = trackIds.filter(trackId => {
            return !this.listenedTracks[trackId]
        })
        return notListenedTracks
    },

    getListenedTracksFromYandexMusic: async function () {
        try {
            const url = "https://music.yandex.ru/api/v2.1/handlers/tracks/fav?external-domain=music.yandex.ru&overembed=no"
            const { data: listenedTracks } = await axios.get(url, queryParams)
            console.log('\x1b[33m%s\x1b[0m', "listenedTracks counts: ", Object.keys(listenedTracks).length);//yellow

            return listenedTracks
        }
        catch (err) {
            console.error("[getListenedTracksFromYandexMusic ERROR]");
            throw new Error(err)
        }
    }
};
