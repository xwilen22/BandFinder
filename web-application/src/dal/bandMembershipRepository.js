module.exports = function ({ db }) {
    return {
        createBandMembership: function (username, bandId, isBandleader, callback) {
            let query = `INSERT INTO band_membership (username,band_id,is_band_leader) VALUES (? , ? , ?)`
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
                if(error){
                    callback(error)
                }
                else{
                    callback(members)
                }
            })
        },

        getBandMembershipByUsername: function(username,callback){
            let query = `SELECT band_membership.band_id, band.band_name, 
                         band.band_biography
                         FROM band_membership
                         INNER JOIN band 
                         ON band_membership.band_id = band.band_id 
                         AND band_membership.username = ?`
            let values = [username]
            db.query(query, values, function(error, bandMembership){
                if(error){
                    callback(error)
                }
                else{
                    callback(bandMembership)
                }
            })
        },

        deleteBandMembership: function (username, bandId, callback) {
            let query = `DELETE * FROM band_membership 
                         WHERE username = ? AND band_id = ?`
            let values = [username, bandId]
            db.query(query, values, function (error) {
                callback(error)
            })
        }
    }
}