module.exports = function ({ db }) {
    return {
        createGenre: function (genreName, callback) {
            let query = `INSERT INTO genre (genre_name) VALUES (?)`
            db.query(query, [genreName], function (error) {
                callback(error)
            })
        },
        /// Creates sub genre for parent genre, however make sure that parent genre exists before invoking this function.
        createSubGenreOf: function (parentGenreName, subGenreName, callback) {
            let query = `INSERT INTO genre (genre_name, parent_genre) VALUES (? , ?)`
            let values = [subGenreName, parentGenreName]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        getGenreByName: function (genreName, callback) {
            let query = `SELECT * FROM genre 
                     WHERE genre_name = ?`
            let values = [genreName]
            db.query(query, values, function (error, genreName) {
                callback(error, genreName)
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
        
        deleteGenreByName: function (genreName, callback) {
            let query = `DELETE FROM genre WHERE genre_name = ?`
            let values = [genreName]
            db.query(query, values, function(error) {
                callback(error)
            })
        }
    }
}