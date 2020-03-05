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
                    id
                },
                raw: true
            })
            .then(band => {
                callback(undefined, band[0])
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
                    id
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
            .then(resultBandEntity => {
                const band = resultBandEntity.get({plain: true})
                console.log("BAND CREATED ID: ", band.id)
                callback(undefined, band.id)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteBandById: function(bandId) {
            bandModel.destroy({
                where: {
                    id:bandId
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