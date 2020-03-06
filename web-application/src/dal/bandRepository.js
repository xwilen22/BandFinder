module.exports = function ({ db }) {
    return {
        getAllBands: function (callback) {
            let query = `SELECT * FROM band`
            db.query = (query, function (error, bands) {
                callback(error, bands)
            })
        },

        getBandById: function (id, callback) {
            let query = `SELECT * FROM band 
                         WHERE band_id = ?`
            let values = [id]
            db.query = (query, values, function (error, band) {
                callback(error, band)
            })
        },

        updateBandById: function (id, bandname, bandbio, genre, callback) {
            let query = `UPDATE band 
                     SET band_name = ?, band_biography = ?, band_genre = ? 
                     WHERE band_id = ?`
            let values = [bandname, bandbio, genre, id]
            db.query = (query, values, function (error, bandArray) {
                callback(error, bandArray[0].band_id)
            })
        },

        createBand: function (bandname, bandbio, genre, maxBandMembers,callback) {
            let query = `INSERT INTO band (band_name, band_biography, band_genre, max_members) 
                         VALUES (? , ? , ? , ?)`
            let values = [bandname, bandbio, genre, maxBandMembers]
            db.query(query, values, function (error, bandArray) {
                callback(error, bandArray[0].band_id)
            })
        },

        deleteBandById: function(bandId, callback) {
            let query = `DELETE * FROM band 
                         INNER JOIN band_membership
                         ON band.band_id = band_membership.band_id
                         WHERE band.band_id = ?`
            let values = [bandId]

            db.query(query,values, function(error){
                callback(error)
            })
        }
    }
}