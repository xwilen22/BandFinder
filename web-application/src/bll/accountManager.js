module.exports = function ({ accountRepository, accountValidation, passwordManager, errorGenerator }) {
    return {
        signUpAccount: function (username, password, callback) {
            const accountValidationErrors = accountValidation.getValidationErrors(password, username)

            if (accountValidationErrors.length > 0) {
                passwordManager.generatePasswordHash(password, function (hashError, hashedPassword) {
                    if (hashError) {
                        callback(hashError)
                    }
                    else {
                        accountRepository.createNewUser(username, hashedPassword, function (error, createdUsername) {
                            if (error) {
                                callback({ code: 500, messages: ["Internal error, sorry about that"] })
                            }
                            callback(error, createdUsername)
                        })
                    }
                })
            }
            else {
                callback(accountValidationErrors)
            }
        },
        signInAccount: function (username, password, callback) {
            accountRepository.getUserByUsername(username, function (error, retrievedUserObject) {
                if (error || retrievedUserObject.length <= 0) {
                    callback(error, false)
                }
                else {
                    const retrievedHashValue = retrievedUserObject[0].password
                    passwordManager.comparePasswordPlainToHash(password, retrievedHashValue, function (compareError, success) {
                        if (compareError) {
                            callback(["BCRYPT ERROR"], false)
                        }
                        else if (success == false) {
                            callback(["WRONG PASSWORD"], false)
                        }
                        else {
                            callback(null, true)
                        }
                    })
                }
            })
        },
        updateAccountPassword: function (username, oldPassword, newPassword, callback) {
            accountRepository.getUserByUsername(username, function (error, userObject) {
                if (error) {
                    callback(error)
                }
                else {
                    let retrievedPassword = userObject.password
                    passwordManager.compareAndGeneratePassword(oldPassword, retrievedPassword, newPassword, function (error, hashedPassword) {
                        if (error) {
                            callback(error)
                        }
                        else {
                            accountRepository.updateUserPassword(username, hashedPassword, function (error) {
                                callback(error)
                            })
                        }
                    })
                }
            })
        },
        updateAccountBiography: function (username, newBiography, callback) {
            accountRepository.updateUserInfoByUsername(username, newBiography, "", function (error) {
                if (error) {
                    console.log(error)
                    callback(["DB ERROR"])
                }
                else {
                    callback([])
                }
            })
        },
        deleteAccount: function (username, password, callback) {
            const validationErrors = accountValidation.getValidationErrors(password, username)

            if (validationErrors.length > 0) {
                callback(validationErrors)
            }
            else {
                accountRepository.getUserByUsername(username, function (error, userObject) {
                    if (error) {
                        callback("DB Failed")
                    }
                    else if (userObject == null) {
                        callback("Can't find user")
                    }
                    else {
                        passwordManager.comparePasswordPlainToHash(password, userObject[0].password, function (error, success) {
                            if (error) {
                                callback("DB ERROR")
                            }
                            else {
                                if (success == true) {
                                    accountRepository.deleteUserByUsername(username, function (error) {
                                        if (error) {
                                            callback(error)
                                        }
                                        else {
                                            callback([])
                                        }
                                    })
                                }
                                else {
                                    callback("BCRYPT ERROR")
                                }
                            }
                        })
                    }
                })
            }
        },

        getAccountByUsername: function (username, callback) {
            if (accountValidation.accountNameValidation(username) == true) {
                accountRepository.getUserByUsername(username, function (error, userObject) {
                    callback(error, userObject)
                })
            }
            else {
                let validationError = "Validation error"
                callback(validationError)
            }
        }
    }
}