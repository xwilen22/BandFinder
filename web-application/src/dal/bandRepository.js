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
            db.query = (query, [id], function (error, band) {
                callback(error, band)
            })
        },

        updateBandById: function (id, bandname, bandbio, genre, callback) {
            let query = `UPDATE band 
                     SET band_name = ?, band_biography = ?, band_genre = ? 
                     WHERE band_id = ?`
            let values = [bandname, bandbio, genre, id]
            db.query = (query, [values], function (error, bandArray) {
                callback(error, bandArray[0].band_id)
            })
        },

        createBand: function (bandname, bandbio, genre, callback) {
            let query = `INSERT INTO band (band_name, band_biography, band_genre) 
                         VALUES (? , ? , ?)`
            let values = [bandname, bandbio, genre]
            db.query(query, [values], function (error, bandArray) {
                callback(error, bandArray[0].band_id)
            })
        },

        deleteBandById: function(bandId) {

        }
    }
}