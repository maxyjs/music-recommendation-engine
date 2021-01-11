const { artistShouldHaveMinimumLikes } = require('../settings/settings')

function filterByYandexMusicUsersLiked(artistData) {

    if (artistData.artist && artistData.artist.likesCount) {
        const artistHasLiked = artistData.artist.likesCount
        return artistHasLiked >= artistShouldHaveMinimumLikes ? artistData : null
    }

    return null
}

module.exports = filterByYandexMusicUsersLiked;