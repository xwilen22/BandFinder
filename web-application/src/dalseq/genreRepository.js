module.exports = function ({ db }) {
    const genreModel = db.model("genre")
    
    return {
        createGenre: function (genreName, callback) {
            genreModel.create({
                genre_name:genreName
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        createSubGenreOf: function (parentGenreName, subGenreName, callback) {
            genreModel.create({
                genre_name:subGenreName,
                parent_genre:parentGenreName
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getGenreByName: function (genreName, callback) {
            genreModel.findAll({
                where: {
                    genre_name:genreName,
                    parent_genre: null
                },
                raw: true
            })
            .then(genre => {
                callback(undefined, genre)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getSubGenresByParentGenre: function (parentGenre, callback) {
            genreModel.findAll({
                where: {
                    parent_name:parentGenre
                }
            })
            .then(subGenres => {
                callback(undefined, subGenres)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getAllGenres: function (callback) {
            genreModel.findAll({
                raw: true
            })
            .then(genres => {
                callback(undefined, genres)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getAllParentGenres: function(callback) {
            genreModel.findAll({
                where: {
                    parent_genre: null
                },
                raw: true
            })
            .then(parentGenres => {
                callback(undefined, parentGenres)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteGenreByName: function (genreName, callback) {
            userModel.destroy({
                where: {
                    genre_name:genreName
                }
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        }
    }
}