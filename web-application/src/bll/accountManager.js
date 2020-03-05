module.exports = function ({ accountRepository, accountValidation, passwordManager, errorGenerator }) {
    return {
        signUpAccount: function (username, password, callback) {
            const accountValidationErrors = accountValidation.getValidationErrors(password, username)

            if (accountValidationErrors.length <= 0) {
                passwordManager.generatePasswordHash(password, function (hashError, hashedPassword) {
                    if (hashError) {
                        callback(errorGenerator.getClientError(hashError))
                    }
                    else {
                        accountRepository.createNewUser(username, hashedPassword, function (error, createdUsername) {
                            if (error) {
                                callback(errorGenerator.getInternalError(error))
                            }
                            else {
                                callback(errorGenerator.getSuccess(), createdUsername)
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
                if (error) {
                    callback(errorGenerator.getInternalError(error), false)
                }
                else if (retrievedUserObject.length <= 0){
                    callback(errorGenerator.getClientError(["No user with that username"]))
                }
                else {
                    const retrievedHashValue = retrievedUserObject[0].password
                    passwordManager.comparePasswordPlainToHash(password, retrievedHashValue, function (compareError, success) {
                        if(compareError) {
                            callback(errorGenerator.getClientError(compareErrors))
                        } 
                        else {
                            callback(errorGenerator.getSuccess(), success)
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
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        deleteAccount: function (username, password, callback) {
            const accountValidationErrors = accountValidation.getValidationErrors(password, username)

            if (accountValidationErrors.length > 0) {
                callback(errorGenerator.getClientError(validationErrors))
            }
            else {
                accountRepository.getUserByUsername(username, function (accountGetError, userObject) {
                    if (accountGetError) {
                        callback(errorGenerator.getInternalError(accountGetError))
                    }
                    else if (userObject == null) {
                        callback(errorGenerator.getInternalError(["Can't find user"]))
                    }
                    else {
                        passwordManager.comparePasswordPlainToHash(password, userObject[0].password, function (passwordCompareError, success) {
                            if (passwordCompareError) {
                                callback(errorGenerator.getInternalError(passwordCompareError))
                            }
                            else {
                                if (success == true) {
                                    accountRepository.deleteUserByUsername(username, function (accountDeleteError) {
                                        if (accountDeleteError) {
                                            callback(accountDeleteError)
                                        }
                                        else {
                                            callback(errorGenerator.getSuccess())
                                        }
                                    })
                                }
                                else {
                                    callback(errorGenerator.getClientError("Wrong password"))
                                }
                            }
                        })
                    }
                })
            }
        },
        getAccountByUsername: function (username, callback) {
            const accountNameValidationErrors = accountValidation.getNameValidationErrors(username)

            if (accountNameValidationErrors.length <= 0) {
                accountRepository.getUserByUsername(username, function (error, userObjects) {
                    if(userObjects == null || userObjects.length <= 0) {
                        callback(errorGenerator.getClientError(["No user with that name"]))
                    }
                    else if (error){
                        callback(errorGenerator.getInternalError(error), null)
                    } 
                    else {
                        callback(errorGenerator.getSuccess(), userObjects[0])
                    }
                })
            }
            else {
                callback(accountNameValidationErrors)
            }
        }
    }
}