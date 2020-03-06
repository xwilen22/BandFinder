module.exports = function ({ db }) {
    return {
        createApplication: function(forBandId, byUsername, callback) {
            const query = `INSERT INTO band_application (band_id, username) 
                           VALUES (?, ?)`
            const values = [forBandId, byUsername]

            db.query(query, values, function(error) {
                callback(error)
            })
        },
        getApplicationsByBandId: function(bandId, callback) {
            const query = `SELECT * FROM band_application
                           WHERE band_id = ?`
            const values = [bandId]

            db.query(query, values, function(error, bandApplications) {
                callback(error, bandApplications)
            })
        },
        getApplicationsByUsername: function(username, callback) {
            const query = `SELECT * FROM band_application
                           WHERE username = ?`
            const values = [username]

            db.query(query, values, function(error, bandApplications) {
                callback(error, bandApplications)
            })
        },
        deleteApplication: function(bandId, username, callback) {
            const query = `DELETE FROM band_application 
                           WHERE band_id = ? AND username = ?`
            const values = [bandId, username]

            db.query(query, values, function(error) {
                callback(error)
            })
        }
    }
}