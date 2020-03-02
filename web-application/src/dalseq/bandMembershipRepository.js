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

        deleteBandMembership: function (username, bandId, callback) {
            bandMembershipModel.delete({
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