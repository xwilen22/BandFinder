module.exports = function ({ db }) {
    const applicationModel = db.model("band_application")

    return {
        createApplication: function(forBandId, byUsername, callback) {
            applicationModel.create({
                band_id: forBandId,
                username: byUsername
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },
        getApplicationsByBandId: function(bandId, callback) {
            applicationModel.findAll({
                where: {
                    band_id:bandId
                },
                raw: true
            })
            .then(bandApplications => {
                callback(undefined, bandApplications)
            })
            .catch(error => {
                callback(error, null)
            })
        },
        getApplicationsByUsername: function(username, callback) {
            applicationModel.findAll({
                where: {
                    username
                },
                raw: true
            })
            .then(bandApplications => {
                callback(undefined, bandApplications)
            })
            .catch(error => {
                callback(error, null)
            })
        },
        deleteApplication: function(bandId, username, callback) {
            applicationModel.destroy({
                where: {
                    username,
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