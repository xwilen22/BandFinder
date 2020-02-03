const connectRedi = require("connect-redis")
const bcrypt = require("bcrypt")
const userValidation = require("userValidation")
const HASH_SALT_ROUNDS = 10

modules.exports = {
    signUpAccount: function (accountName, password, callback) {
        if (userValidation.accountNameValidation(accountName) && userValidation.passwordValidation(password)) {
                bcrypt.hash(password, HASH_SALT_ROUNDS, function(hashError, hashedPassword) {
                    if (hashError) {
                        callback(hashError)
                    } 
                    else {
                        //DAL DB CALL TO CREATE USER WITH NAME & PASSWORD
                    }
                })
        }
        else {
            let validationError = ["Failed to validate password or username"]
            callback(validationError)
        }
    },

    signInAccount: function (accountName, password, callback) {
        //Retrieve account info such as password via accountName
        //callback(error, id, hashValue)

        if (accountName == retrivedAccountName) {
            bcrypt.compare(password, retrievedHashValue, function(compareError, success) {
                callback(compareError, success)
            })
        }
        else {
            callback(errorAccountName)
        }
    },

    updateAccount: function (accountName, password, callback) {
        
        
        if (sessionValidation.validateAccountnameInSession == true) {
            //callback(id)
        }
        else {
            //callback(errorUnauthorized)
        }
    },

    deleteAccount: function (accountName, password, callback) {
        if (sessionValidation.validateAccountnameInSession == true) {
            //callback(error, accountName)
        }
        else {
            //callback(errorUnauthorized)
        }
    }
}