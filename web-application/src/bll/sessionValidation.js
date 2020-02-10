module.exports = function({}) {
    return {
        validateAccountnameInSession: function(accountName, sessionAccountName) {
            return accountName == sessionAccountName
        }
    }
}