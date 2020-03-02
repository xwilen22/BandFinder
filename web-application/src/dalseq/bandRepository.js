module.exports = function ({ db }) {
    const bandModel = db.model("band")
    
    return {
        getAllBands: function (callback) {
            bandModel.findAll({
                raw: true
            })
            .then(bands => {
                callback(undefined, bands)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getBandById: function (id, callback) {
            bandModel.findAll({
                where: {
                    band_id:id
                },
                raw: true
            })
            .then(band => {
                callback(undefined, band)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        updateBandById: function (id, bandname, bandbio, genre, callback) {
            bandModel.update({
                band_name:bandname,
                band_biography:bandbio,
                band_genre:genre
            },{
                where: {
                    band_id:id
                }
            })
            .then(band => {
                callback(undefined, band.band_id)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        createBand: function (bandname, bandbio, genre, maxMembers,callback) {
            bandModel.create({
                band_name:bandname,
                band_biography:bandbio,
                band_genre:genre,
                max_members:maxMembers
            })
            .then(band => {
                callback(undefined, band.band_id)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteBandById: function(bandId) {
            bandModel.delete({
                where: {
                    band_id:bandId
                }
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        }
    }
}