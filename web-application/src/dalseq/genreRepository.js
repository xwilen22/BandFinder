module.exports = function ({ db }) {
    return {
        createGenre: function (genreName, callback) {

        },

        createSubGenreOf: function (parentGenreName, subGenreName, callback) {

        },

        deleteSubGenre: function (genreName, parentGenre, callback) {

        },

        getParentGenreByName: function (parentGenre, callback) {

        },

        getSubGenresByParentGenre: function (parentGenre, callback) {

        },

        getAllGenres: function (callback) {

        },

        getAllParentGenres: function(callback) {

        },

        deleteGenreByName: function (genreName, callback) {

        }
    }
}