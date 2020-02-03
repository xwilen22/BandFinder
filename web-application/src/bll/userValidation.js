const PASSWORD_MIN_LENGTH = 6
const ACCOUNTNAME_MIN_LENGTH = 4
const ACCOUNTNAME_MAX_LENGTH = 20
modules.exports = {
    passwordValidation: function(password) {
        if (password.length >= PASSWORD_MIN_LENGTH) {
            return true
        }
        else {
            return false
        }
    },
    
    accountNameValidation: function(accountName){
        if (accountName >= ACCOUNTNAME_MIN_LENGTH && accountName <= ACCOUNTNAME_MAX_LENGTH){
            return true
        }
        else{
            return false
        }
    }
}