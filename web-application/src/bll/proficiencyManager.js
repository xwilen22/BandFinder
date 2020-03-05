module.exports = function ({errorGenerator, proficiencyRepository, proficiencyValidation, accountManager}) { 
    return {
        createProficiency(username, instrumentName, proficiencyLevelNumber, callback) {
            proficiencyValidation.retrieveUsernameAndInstrumentName(username, instrumentName, function(formatedError, usernameAndInstrumentObject) {
                if(formatedError) {
                    console.log("Failed getting intrument and user")
                    callback(formatedError)
                }
                else {
                    const retrievedUsername = usernameAndInstrumentObject.username
                    const retrievedInstrumentName = usernameAndInstrumentObject.instrumentName

                    proficiencyRepository.createUserProficiency(retrievedUsername, retrievedInstrumentName, proficiencyLevelNumber, function(error) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback(errorGenerator.getSuccess())
                        }
                    })
                }
            })
        },
        updateProficiencyLevelForUser(username, instrumentName, newLevelNumber, callback) {
            proficiencyValidation.retrieveUsernameAndInstrumentName(username, instrumentName, function(formatedError, usernameAndInstrumentObject) {
                if(formatedError) {
                    callback(formatedError)
                }
                else {
                    const retrievedUsername = usernameAndInstrumentObject.username
                    const retrievedInstrumentName = usernameAndInstrumentObject.instrumentName

                    proficiencyRepository.updateUserProficiencyLevel(retrievedUsername, retrievedInstrumentName, newLevelNumber, function(error) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback(errorGenerator.getSuccess())
                        }
                    })
                }
            })
        },
        deleteProficiencyForUser(username, instrumentName, callback) {
            proficiencyValidation.retrieveUsernameAndInstrumentName(username, instrumentName, function(formatedError, usernameAndInstrumentObject) {
                if(formatedError) {
                    callback(formatedError)
                }
                else {
                    const retrievedUsername = usernameAndInstrumentObject.username
                    const retrievedInstrumentName = usernameAndInstrumentObject.instrumentName

                    proficiencyRepository.deleteUserProficiency(retrievedUsername, retrievedInstrumentName, function(error) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback(errorGenerator.getSuccess())
                        }
                    })
                }
            })
        },
        getAllProficienciesForUser(username, callback) {
            accountManager.getAccountByUsername(username, function(accountErrors, userObject) {
                if(accountErrors) {
                    callback(accountErrors)
                }
                else {
                    proficiencyRepository.getAllProficienciesByUsername(userObject.username, function(error, proficiencies) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            console.log("BLL PROF: ", proficiencies)
                            callback(errorGenerator.getSuccess(), proficiencies)
                        }
                    })
                }
            })
        }
    }
}