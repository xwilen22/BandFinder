module.exports = function ({errorGenerator, proficiencyRepository, proficiencyValidation, accountManager}) { 
    return {
        createProficiency(username, instrumentName, proficiencyLevelNumber, callback) {
            proficiencyValidation.retrieveUsernameAndInstrumentName(username, instrumentName, function(formatedError, usernameAndInstrumentObject) {
                if(formatedError) {
                    callback(formatedError)
                }
                else {
                    const retrievedUsername = usernameAndInstrumentObject.username
                    const retrievedInstrumentName = usernameAndInstrumentObject.instrumentName

                    proficiencyRepository.createUserProficiency(retrievedUsername, retrievedInstrumentName, function(error) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback([])
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
                            callback([])
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
                            callback([])
                        }
                    })
                }
            })
        },
        getAllProficienciesForUser(username, callback) {
            accountManager.getAccountByUsername(username, function(accountError, userObject) {
                if(accountError) {
                    callback(accountError)
                }
                else {
                    const retrievedUsername = userObject.username
                    proficiencyRepository.getAllProficienciesByUsername(username, function(error, proficiencies) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            callback([], proficiencies)
                        }
                    })
                }
            })
        }
    }
}