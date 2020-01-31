const PASSWORDMINLENGTH = 6
const ACCOUNTNAMEMINLENGTH = 4
module.exports = {
    passwordValidation: function(password) {
        if (password.length >= PASSWORDMINLENGTH) {
            return true
        }
        else {
            return false
        }
    },
    
    accountNameValidation: function(accountName){
        if (accountName >= ACCOUNTNAMEMINLENGTH){
            return true
        }
        else{
            return false
        }
    }
}