const bcrypt = require("bcrypt")

const HASH_SALT_ROUNDS = 10

module.exports = {
    generatePasswordHash: function(plainPassword, callback) {

    },
    compareAndGeneratePassword: function(oldPassword, newPassword, callback) {
        bcrypt.compare(oldPassword, retrievedPassword, function(error, success) {
            if (error) {
                callback(error)
            }
            else if (success == false) {
                let compareError = "Failed comparision"
                callback(compareError)
            } 
            else {
                bcrypt.hash(newPassword, HASH_SALT_ROUNDS, function(error, hashedPassword) {
                    callback(error, hashedPassword)
                })
            }
        })
    }
}