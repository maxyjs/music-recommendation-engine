const fs = require('fs')
let lastIdArtist = require('./cache/lastIdArtist').lastIdArtist

const INTERVAL_PERIODIC_SAVING_ARTIST = 200

module.exports = {

    lastIdArtist: undefined,
    lastSavedArtist: undefined,

    getNextId: function () {

        if(this.lastSavedArtist + INTERVAL_PERIODIC_SAVING_ARTIST < this.lastIdArtist ) {
            this.saveLastIdArtistToFile(this.lastIdArtist)
        }

        this.lastIdArtist+=1
        return this.lastIdArtist
    },

    getLastIdArtistFromFile: function () {
        return +(lastIdArtist);
    },

    saveLastIdArtistToFile: function (id) {
        const data = {
            "lastIdArtist": id
        }
        fs.writeFileSync(__dirname + "/cache/lastIdArtist.json", JSON.stringify(data))
        this.lastSavedArtist = id
    },

    setLastIdArtist: function (lastIdArtist) {
        this.lastIdArtist = lastIdArtist
    },

    init: async function () {

        const lastIdArtist = this.getLastIdArtistFromFile()
        console.log('\x1b[33m%s\x1b[0m', "lastIdArtist: ", lastIdArtist)
        this.setLastIdArtist(lastIdArtist)
        this.lastSavedArtist = lastIdArtist

        process.stdin.resume()

        process.on('SIGINT', () => {
            this.saveLastIdArtistToFile(this.lastIdArtist - 5)
            console.log('Received SIGINT.')
            process.exit(0)
        })

    }
};

