module.exports = {
    validateAccountnameInSession: function(accountName, sessionAccountName) {
        return accountName == sessionAccountName
    }
}