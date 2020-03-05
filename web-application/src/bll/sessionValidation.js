module.exports = function({}) {
    return {
        validateAccountNameInSession: function(accountName, sessionAccountName) {
            return accountName == sessionAccountName
        },

        validateCurrentUserBandLeader: function(bandmembers, sessionAccountName){
            console.log("DAS MEMBERS: ",bandmembers)
            bandmembers.forEach(member => {
                console.log("does it get here", sessionAccountName, member)
                if(member.username == sessionAccountName){
                    return member.is_band_leader
                }
                else{
                    return false
                }
            })
            for(let i = 0; i < bandmembers.length; i++) {
                console.log("JAVASCRIPT IS A TERRIBLE LANGUAGE", bandmembers[i])
            }
            /*for(const member of bandmembers){
                console.log("does it get here",sessionAccountName)
                if(member.username == sessionAccountName){
                    return member.is_band_leader
                }
                else{
                    return false
                }
            }*/
        }
    }
}