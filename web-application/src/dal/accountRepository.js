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

    getByIdFromTable: function(id, callback){
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
        let query = `UPDATE band SET bandname, bandbio, genre WHERE id = ?`
        db.query = (query,[id],function(error,band){
            if(error){

            }
            else{
                callback(band)
            }
        })
    }
}