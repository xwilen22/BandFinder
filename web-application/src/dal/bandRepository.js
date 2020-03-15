module.exports = function ({ db }) {
    return {
        getAllBands: function (callback) {
            let query = `SELECT * FROM band`
            db.query(query, function (error, bands) {
                callback(error, bands)
            })
        },

        getBandById: function (id, callback) {
            let query = `SELECT * FROM band 
                         WHERE id = ?`
            let values = [id]
            db.query(query, values, function (error, band) {
                callback(error, band[0])
            })
        },

        getBandsBySearchTitle: function(bandName, callback) {
            let query = `SELECT * FROM band WHERE MATCH band_name
                         AGAINST (? IN BOOLEAN MODE)`
            let values = [`*${bandName}*`]

            db.query(query, values, function(error, bandMatchArray) {
                console.log(bandMatchArray)
                callback(error, bandMatchArray)
            })
        },

        updateBandById: function (id, bandname, bandbio, genre, callback) {
            let query = `UPDATE band 
                         SET band_name = ?, band_biography = ?, band_genre = ? 
                         WHERE id = ?`
            let values = [bandname, bandbio, genre, id]
            db.query(query, values, function (error, bandArray) {
                callback(error, bandArray[0].id)
            })
        },

        createBand: function (bandname, bandbio, genre, maxBandMembers, callback) {
            let query = `INSERT INTO band (band_name, band_biography, band_genre, max_members) 
                         VALUES (? , ? , ? , ?)`
            let values = [bandname, bandbio, genre, maxBandMembers]
            db.query(query, values, function (error, okPacketObject) {
                callback(error, okPacketObject.insertId)
            })
        },

        deleteBandById: function(bandId, callback) {
            let query = `DELETE FROM band
                         WHERE band.id = ?`
            let values = [bandId]
            db.query(query,values, function(error){
                callback(error) 
            })
        }
    }
}