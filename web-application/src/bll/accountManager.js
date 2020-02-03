const connectRedi = require("connect-redis")

const accountValidation = require("./accountValidation")
const sessionValidation = require("./sessionValidation")
const passwordManager = require("./passwordManager")

const accountRepository = require("../dal/accountRepository")

module.exports = {
    signUpAccount: function (username, password, callback) {
        if (accountValidation.accountNameValidation(username) && accountValidation.passwordValidation(password)) {
            passwordManager.generatePasswordHash(password, function(error, hashedPassword) {
                if (error) {
                    callback(error)
                } 
                else {
                    accountRepository.createNewUser(username, hashedPassword, "", "", function(error, createdUsername) {
                        callback(error, createdUsername)
                    })
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

    updateAccountPassword: function (username, oldPassword ,newPassword, callback) {
        if (sessionValidation.validateAccountnameInSession(username) == true) {
            accountRepository.getUserById(username, function(error, userObject) {
                if(error) {
                    callback(error)
                }
                else {
                    let retrievedPassword = userObject.password
                    passwordManager.compareAndGeneratePassword(oldPassword, retrievedPassword, newPassword, function(error, hashedPassword) {
                        if (error) {
                            callback(error)
                        }
                        else {
                            accountRepository.updateUserPassword(username, hashedPassword, function(error) {
                                callback(error)
                            })
                        }
                    })
                }
            })
        }
        else {
            let errorUnauthorized = "Unauthorized"
            callback(errorUnauthorized)
        }
    },

    deleteAccount: function (username, password, callback) {
        if (sessionValidation.validateAccountnameInSession(username) == true) {
            accountRepository.deleteUserById(username, function(error) {
                callback(error)
            })
        }
        else {
            let errorUnauthorized = "Unauthorized"
            callback(errorUnauthorized)
        }
    }
}