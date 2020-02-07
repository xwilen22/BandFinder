const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports = {
    createGenre: function(genreName,callback){
        let query = `INSERT INTO genre (genre_name) VALUES (?)`
        db.query(query,[genreName],function(error){
            callback(error)
        })
    },

    createSubGenreOf: function(genreName,parentGenre,callback){
        let query = `INSERT INTO genre (genre_name, parent_genre) VALUES (? , ?)`
        let values = [genreName,parentGenre]
        db.query(query, [values], function(error){
            callback(error)
        })
    },

    deleteSubGenre: function(genreName,parentGenre,callback){
        let query = `DELETE * FROM genre WHERE (genre_name, parent_genre) = (? , ?)`
        let values = [genreName,parentGenre]
        db.query(query, [values],function(error){
            callback(error)
        })
    },

    deleteGenre: function(genreName,parentGenre,callback){
        //todo implement this so that it also deletes all children
    }
}