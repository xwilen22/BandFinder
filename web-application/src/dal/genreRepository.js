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

        getParentGenresByName: function (parentGenre, callback) {
            let query = `SELECT * FROM genre 
                     WHERE genre_name = ?`
            db.query(query, [parentGenre], function (error, parentGenres) {
                if (error) {
                    callback(error)
                }
                else {
                    callback(genres)
                }
            })
        },

        getSubGenresByName: function (genreName, parentGenre, callback) {
            let query = `SELECT * FROM genre 
                     WHERE parent_genre = ? AND genre_name = ?`
            let values = [parentGenre, genreName]
            db.query(query, values, function (error, subGenres) {
                if (error) {
                    callback(error)
                }
                else {
                    callback(subGenres)
                }
            })
        },

        getAllGenres: function (callback) {
            let query = `SELECT * FROM genre`
            db.query(query, function (error, genres) {
                if (error) {
                    callback(error)
                }
                else {
                    callback(genres)
                }
            })
        },

        deleteGenre: function (genreName, parentGenre, callback) {
            //todo implement this so that it also deletes all children
        }
    }
}