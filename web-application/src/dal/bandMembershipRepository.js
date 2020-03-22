module.exports = function ({ db }) {
    return {
        createBandMembership: function (username, bandId, isBandleader, callback) {
            let query = `INSERT INTO band_membership (username , band_id, is_band_leader) VALUES (? , ? , ?)`
            let values = [username, bandId, isBandleader]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        updateBandMemberLeaderStatus: function (username, bandId, isBandleader, callback) {
            let query = `UPDATE band_membership 
                         SET is_band_leader = ? 
                         WHERE username = ? AND band_id = ?`
            let values = [isBandleader, username, bandId]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        getBandMembershipByBandId: function(bandId,callback){
            let query = `SELECT * FROM band_membership
                         WHERE band_id = ?`
            let values = [bandId]
            db.query(query, values, function(error, members){
                callback(error, members)
            })
        },

        getBandMembershipByUsername: function(username,callback){
            let query = `SELECT * FROM band_membership AS membership 
                         INNER JOIN band ON membership.band_id = band.id
                         WHERE membership.username = ?`
            let values = [username]
            db.query(query, values, function(error, bandMembership){
                callback(error, bandMembership)
            })
        },

        deleteBandMembership: function (username, bandId, callback) {
            let query = `DELETE FROM band_membership 
                         WHERE username = ? AND band_id = ?`
            let values = [username, bandId]
            db.query(query, values, function (error) {
                callback(error)
            })
        }
    }
}