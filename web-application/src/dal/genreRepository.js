module.exports = function ({ db }) {
    return {
        createGenre: function (genreName, callback) {
            let query = `INSERT INTO genre (genre_name) VALUES (?)`
            db.query(query, [genreName], function (error) {
                callback(error)
            })
        },

        createSubGenreOf: function (genreName, parentGenre, callback) {
            let query = `INSERT INTO genre (genre_name, parent_genre) VALUES (? , ?)`
            let values = [genreName, parentGenre]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        deleteSubGenre: function (genreName, parentGenre, callback) {
            let query = `DELETE * FROM genre 
                     WHERE genre_name = ? AND parent_genre = ?`
            let values = [genreName, parentGenre]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        getParentGenreByName: function (parentGenre, callback) {
            let query = `SELECT * FROM genre 
                     WHERE genre_name = ?`
            db.query(query, [parentGenre], function (error, parentGenre) {
                callback(error, parentGenre)
            })
        },

        getSubGenresByParentGenre: function (parentGenre, callback) {
            let query = `SELECT * FROM genre 
                         WHERE parent_genre = ?`
            let values = [parentGenre]
            db.query(query, values, function (error, subGenres) {
                callback(error, subGenres)
            })
        },

        getAllGenres: function (callback) {
            let query = `SELECT * FROM genre`
            db.query(query, function (error, genres) {
                callback(error, genres)
            })
        },

        getAllParentGenres: function(callback) {
            let query = `SELECT * FROM genre
                         WHERE parent_genre IS NULL or parent_genre = ''`
            db.query(query, function(error, parentGenres) {
                callback(error, parentGenres)
            })
        },

        deleteGenre: function (genreName, parentGenre, callback) {
            //todo implement this so that it also deletes all children
        }
    }
}