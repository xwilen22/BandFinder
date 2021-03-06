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

        getBandsBySearchTitle: function(bandName, callback) {
            db.query(`SELECT * FROM bands 
                      WHERE band_name @@ plainto_tsquery('english', :query)`, 
            {
                model: bandModel,
                replacements: { query: [bandName] },
                raw: true
            })
            .then(bands => {
                callback(undefined, bands)
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
            .then(bandIds => {
                callback(undefined, bandIds[0])
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
                callback(undefined, band.id)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteBandById: function (bandId, callback) {
            db.query(`DELETE FROM bands AS bands
                      USING band_memberships AS members
                      WHERE bands.id = members.band_id
                      AND bands.id = ?`,
            {
                replacements: [bandId],
                type: db.QueryTypes.DELETE
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