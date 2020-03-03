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

        getBandMembershipByBandId: function (bandId, callback){
            bandMembershipRepository.getBandMembershipByBandId(bandId, function(error, bandMembers){
                if(error){
                    callback(errorGenerator.getInternalError(error),null)
                }
                else{
                    callback([],bandMembers)
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