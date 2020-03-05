module.exports = function({}) {
    return {
        validateAccountNameInSession: function(accountName, sessionAccountName) {
            return accountName == sessionAccountName
        },

        validateIsCurrentUserBandLeader: function(bandmembers, sessionAccountName){
            for (const member of bandmembers){
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