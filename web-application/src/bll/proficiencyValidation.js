module.exports = function ({accountManager, instrumentManager}) {
    return {
        retrieveUsernameAndInstrumentName(username, instrumentName, callback) {
            accountManager.getAccountByUsername(username, function(accountErrors, userObject) {
                if(accountErrors) {
                    callback(accountError)
                }
                else {
                    instrumentManager.getInstrumentByName(instrumentName, function(instrumentErrors, instrumentObject) {
                        if (instrumentErrors) {
                            callback(instrumentError)
                        }
                        else {
                            const retrievedUsername = userObject.username
                            const retrievedInstrumentName = instrumentObject.instrument_name
                            callback(undefined, {username: retrievedUsername, instrumentName: retrievedInstrumentName})
                        }
                    })
                }
            })
        }
    }
}