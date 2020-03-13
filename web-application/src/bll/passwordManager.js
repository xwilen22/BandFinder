module.exports = function ({errorGenerator}) {
    const bcrypt = require("bcrypt")
    const HASH_SALT_ROUNDS = 10

    return {
        generatePasswordHash: function (plainPassword, callback) {
            bcrypt.hash(plainPassword, HASH_SALT_ROUNDS, function (error, hashedPassword) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), hashedPassword)
                }
            })
        },
        compareAndGeneratePassword: function (oldPassword, retrievedOldPassword, newPassword, callback) {
            bcrypt.compare(oldPassword, retrievedOldPassword, function (error, success) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else if (success == false) {
                    callback(errorGenerator.getClientError(["Invalid password"]))
                }
                else {
                    bcrypt.hash(newPassword, HASH_SALT_ROUNDS, function (error, hashedPassword) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback(errorGenerator.getSuccess(), hashedPassword)
                        }
                    })
                }
            })
        },
        comparePasswordPlainToHash: function (passwordPlain, passwordHash, callback) {
            bcrypt.compare(passwordPlain, passwordHash, function (error, success) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else if (success == false) {
                    callback(errorGenerator.getClientError(["Invalid password"]))
                }
                else {
                    callback(errorGenerator.getSuccess(), success)
                }
            })
        },
        comparePasswordPlainToPlainSync: function(password, passwordRepeat) {
            return password == passwordRepeat
        }
    }
}