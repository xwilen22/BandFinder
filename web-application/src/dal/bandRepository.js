const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports = {
    getAllBands: function(callback){
        let query = `SELECT * FROM band`
        db.query = (query, function(error,bands){
            if(error){
                callback(error)
            }
            else{
                callback(bands)
            }
        })
    },

    getBandById: function(id, callback){
        let query = `SELECT * FROM band WHERE band_id = ?`
        db.query = (query,[id],function(error,band){
            if(error){
                callback(error)
            }
            else{
                callback(band)
            }
        })
    },

    updateBandById: function(id, bandname, bandbio, genre, callback){
        let query = `UPDATE band SET (band_name, band_biography, band_genre) VALUES ? WHERE band_id = ?`
        let values = [bandname,bandbio,genre,id]
        db.query = (query,[values],function(error,band){
            if(error){
                callback(error)
            }
            else{
                callback(band)
            }
        })
    },

    createBand: function(bandname, bandbio, genre, callback){
        let query = `INSERT INTO band (band_name, band_biography, band_genre) VALUES ?`
        let values=[bandname,bandbio,genre]
        db.query(query,[values],function(error,band){
            if(error){
                callback(error)
            }
            else{
                callback(band)
            }
        })
    },

    

}