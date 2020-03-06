module.exports = function({}) {
    return {
        validateAccountNameInSession: function(accountName, sessionAccountName) {
            return accountName == sessionAccountName
        },

        validateCurrentUserBandLeader: function(bandmembers, sessionAccountName){
            /*bandmembers.forEach(member => {
                console.log("does it get here", sessionAccountName, member)
                if(member.username == sessionAccountName){
                    console.log("what is this? ", member.is_band_leader)
                    return member.is_band_leader
                }
                else{
                    return false
                }
            })*/
            for(const member of bandmembers){
                if(member.username == sessionAccountName){
                    return member.is_band_leader
                }
            }
            
            return false
        }
    }
}