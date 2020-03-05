module.exports = function({}) {
    return {
        validateAccountNameInSession: function(accountName, sessionAccountName) {
            return accountName == sessionAccountName
        },

        validateSsCurrentUserBandLeader: function(bandmembers, sessionAccountName){
            for(const member in bandmembers){
                if(member.username == sessionAccountName){
                    return member.is_band_leader
                }
                else{
                    return false
                }
            }
        }
    }
}