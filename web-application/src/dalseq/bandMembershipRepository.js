module.exports = function ({ db }) {
    const bandMembershipModel = db.model("band_membership")

    return {
        createBandMembership: function (username, bandId, isBandleader, callback) {
            bandMembershipModel.create({
                username,
                band_id:bandId,
                is_band_leader:isBandleader
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        updateBandMemberLeaderStatus: function (username, bandId, isBandleader, callback) {
            bandMembershipModel.update({
                is_band_leader:isBandleader
            },{
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
        },

        getBandMembershipByBandId: function(bandId,callback){
            bandMembershipModel.findAll({
                where: {
                    band_id:bandId
                },
                raw: true
            })
            .then(members => {
                callback(undefined, members)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getBandMembershipByUsername: function(username,callback){
            bandMembershipModel.findAll({
                include: [{
                    model: db.model("band"),
                    where: {band_id: id, username}
                }],
                raw: true
            })
            .then(bandMemberships => {
                callback(undefined, bandMemberships)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteBandMembership: function (username, bandId, callback) {
            bandMembershipModel.destroy({
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