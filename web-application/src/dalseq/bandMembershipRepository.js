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
            db.query(`SELECT * FROM public.band_memberships AS membership 
                      INNER JOIN public.bands AS band ON membership.band_id = band.id
                      WHERE membership.username = ?`,
            {
                replacements: [username],
                type: db.QueryTypes.SELECT
            })
            .then(bandMemberships => {
                callback(undefined, bandMemberships)
            })
            .catch(error => {
                callback(error, null)
            })

                        /*bandMembershipModel.findAll({
                include: [{
                    model: db.model("band"),
                    where: {band_id: db.model("band").id, username},
                }],
                raw: true
            })*/
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