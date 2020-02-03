const PASSWORD_MIN_LENGTH = 6
const ACCOUNTNAME_MIN_LENGTH = 4
const ACCOUNTNAME_MAX_LENGTH = 20

modules.exports = {
    passwordValidation: function(password) {
        return password.length >= PASSWORD_MIN_LENGTH
    },
    
    accountNameValidation: function(accountName){
        return (accountName >= ACCOUNTNAME_MIN_LENGTH && accountName <= ACCOUNTNAME_MAX_LENGTH)
    }
}