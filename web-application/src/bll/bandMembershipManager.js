module.exports = function ({bandMembershipRepository, errorGenerator}){
    return{
        createBandMembership: function(username, bandId, isBandLeader, callback){
            bandMembershipRepository.createBandMembership(username, bandId, isBandLeader, function(error){
                if(error){
                    callback(errorGenerator.getInternalError(error))
                }
                else{
                    callback([])
                }
            })
        },

        updateBandMemberLeaderStatus: function (username, bandId, isBandleader, callback){
            bandMembershipRepository.updateBandMemberLeaderStatus(username,bandId,isBandleader,function(error){
                if(error){
                    callback(errorGenerator.getInternalError(error))
                }
                else{
                    callback([])
                }
            })
        },

        deleteBandMembership: function (username, bandId, callback) {
            bandMembershipRepository.deleteBandMembership(username,bandId,function(error){
                if(error){
                    callback(errorGenerator.getInternalError(error))
                }
                else{
                    callback([])
                }
            })
        }
    }
}