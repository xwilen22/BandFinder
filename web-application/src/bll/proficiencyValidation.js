module.exports = function ({accountManager, instrumentManager}) {
    return {
        retrieveUsernameAndInstrumentName(username, instrumentName, callback) {
            accountManager.getAccountByUsername(username, function(error, userObject) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else if(userObject == null) {
                    callback(errorGenerator.getClientError(["User does not exist"]))
                }
                else {
                    instrumentManager.getInstrumentByName(instrumentName, function(error, instrumentObject) {
                        if (error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else if (instrument == null) {
                            callback(errorGenerator.getClientError(["Instrument does not exist"]))
                        }
                        else {
                            const retrievedUsername = userObject.username
                            const retrievedInstrumentName = instrumentObject.instrument_name
                            callback([], {username: retrievedUsername, instrumentName: retrievedInstrumentName})
                        }
                    })
                }
            })
        }
    }
}