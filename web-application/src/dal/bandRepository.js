const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

modules.exports = {
    getAllFromBand: function(callback){
        let query = `SELECT * FROM band`
        db.query = (query, function(error,bands){
            if(error){

            }
            else{
                callback(bands)
            }
        })
    },

    getBandById: function(id, callback){
        let query = `SELECT * FROM band WHERE id = ?`
        db.query = (query,[id],function(error,band){
            if(error){

            }
            else{
                callback(band)
            }
        })
    },

    updateBandById: function(id, bandname, bandbio, genre, callback){
        let query = `UPDATE band SET (bandname, bandbio, genre) VALUES ? WHERE id = ?`
        let values = [bandname,bandbio,genre,id]
        db.query = (query,[values],function(error,band){
            if(error){

            }
            else{
                callback(band)
            }
        })
    },

    createBand: function(accoutnameBandleader, bandname, bandbio, genre, callback){
        let query = `INSERT INTO band (user, bandname, bandbio, genre) VALUES ?`
        let values=[accoutnameBandleader,bandname,bandbio,genre]
        db.query(query,[values],function(error,band){
            if(error){

            }
            else{
                callback(band)
            }
        })
    },

    

}