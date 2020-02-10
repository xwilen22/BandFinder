
module.exports = function ({}) {
    const bcrypt = require("bcrypt")
    const HASH_SALT_ROUNDS = 10

    return {
        generatePasswordHash: function (plainPassword, callback) {
            bcrypt.hash(plainPassword, HASH_SALT_ROUNDS, function (error, hashedPassword) {
                callback(error, hashedPassword)
            })
        },
        compareAndGeneratePassword: function (oldPassword, retrievedOldPassword, newPassword, callback) {
            bcrypt.compare(oldPassword, retrievedOldPassword, function (error, success) {
                if (error) {
                    callback(error)
                }
                else if (success == false) {
                    let compareError = "Failed comparison"
                    callback(compareError)
                }
                else {
                    bcrypt.hash(newPassword, HASH_SALT_ROUNDS, function (error, hashedPassword) {
                        callback(error, hashedPassword)
                    })
                }
            })
        },
        comparePasswordPlainToHash: function (passwordPlain, passwordHash, callback) {
            bcrypt.compare(passwordPlain, passwordHash, function (error, success) {
                callback(error, success)
            })
        }
    }
}