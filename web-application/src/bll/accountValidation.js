const PASSWORD_MIN_LENGTH = 6
const ACCOUNTNAME_MIN_LENGTH = 4
const ACCOUNTNAME_MAX_LENGTH = 20

module.exports = {
    passwordValidation: function(password) {
        return password.length >= PASSWORD_MIN_LENGTH
    },
    
    accountNameValidation: function(accountName) {
        return (accountName.length >= ACCOUNTNAME_MIN_LENGTH && accountName.length <= ACCOUNTNAME_MAX_LENGTH)
    }
}