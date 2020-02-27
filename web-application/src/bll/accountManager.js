module.exports = function ({ accountRepository, accountValidation, passwordManager, errorGenerator }) {
    return {
        signUpAccount: function (username, password, callback) {
            const accountValidationErrors = accountValidation.getValidationErrors(password, username)

            if (accountValidationErrors.length <= 0) {
                passwordManager.generatePasswordHash(password, function (hashErrors, hashedPassword) {
                    if (hashErrors.length > 0) {
                        callback(errorGenerator.getClientError(hashErrors))
                    }
                    else {
                        accountRepository.createNewUser(username, hashedPassword, function (error, createdUsername) {
                            if (error) {
                                callback(errorGenerator.getInternalError(error))
                            }
                            else {
                                callback([], createdUsername)
                            }
                        })
                    }
                })
            }
            else {
                callback(errorGenerator.getClientError(accountValidationErrors))
            }
        },
        signInAccount: function (username, password, callback) {
            accountRepository.getUserByUsername(username, function (error, retrievedUserObject) {
                if (error || retrievedUserObject.length <= 0) {
                    callback(errorGenerator.getInternalError(error), false)
                }
                else {
                    const retrievedHashValue = retrievedUserObject[0].password
                    passwordManager.comparePasswordPlainToHash(password, retrievedHashValue, function (compareErrors, success) {
                        if(compareErrors.length > 0) {
                            callback(errorGenerator.getClientError(compareErrors))
                        } 
                        else {
                            callback([], success)
                        }
                    })
                }
            })
        },
        updateAccountPassword: function (username, oldPassword, newPassword, callback) {
            accountRepository.getUserByUsername(username, function (error, userObject) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    let retrievedPassword = userObject.password
                    passwordManager.compareAndGeneratePassword(oldPassword, retrievedPassword, newPassword, function (compareError, hashedPassword) {
                        if (compareError.length > 0) {
                            callback(errorGenerator.getClientError(compareError))
                        }
                        else {
                            accountRepository.updateUserPassword(username, hashedPassword, function (error) {
                                callback(errorGenerator.getInternalError(error))
                            })
                        }
                    })
                }
            })
        },
        updateAccountBiography: function (username, newBiography, callback) {
            accountRepository.updateUserInfoByUsername(username, newBiography, "", function (error) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([])
                }
            })
        },
        deleteAccount: function (username, password, callback) {
            const accountValidationErrors = accountValidation.getValidationErrors(password, username)

            if (accountValidationErrors.length > 0) {
                callback(errorGenerator.getClientError(validationErrors))
            }
            else {
                accountRepository.getUserByUsername(username, function (error, userObject) {
                    if (error) {
                        callback(errorGenerator.getInternalError(error))
                    }
                    else if (userObject == null) {
                        callback(errorGenerator.getInternalError(["Can't find user"]))
                    }
                    else {
                        passwordManager.comparePasswordPlainToHash(password, userObject[0].password, function (error, success) {
                            if (error.length > 0) {
                                callback(errorGenerator.getInternalError(error))
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
            const accountNameValidationErrors = accountValidation.getNameValidationErrors(username)

            if (accountNameValidationErrors <= 0) {
                accountRepository.getUserByUsername(username, function (error, userObject) {
                    if(userObject == null) {
                        callback(errorGenerator.getClientError(["No user with that name"]))
                    }
                    else {
                        callback(errorGenerator.getInternalError(error), userObject)
                    }
                })
            }
            else {
                callback(accountNameValidationErrors)
            }
        }
    }
}