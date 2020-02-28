module.exports = function ({accountManager, instrumentManager}) {
    return {
        retrieveUsernameAndInstrumentName(username, instrumentName, callback) {
            accountManager.getAccountByUsername(username, function(accountErrors, userObject) {
                if(accountErrors.length > 0) {
                    callback(accountError)
                }
                else {
                    console.log("Found user!")
                    instrumentManager.getInstrumentByName(instrumentName, function(instrumentErrors, instrumentObject) {
                        if (instrumentErrors.length > 0) {
                            callback(instrumentError)
                        }
                        else {
                            const retrievedUsername = userObject.username
                            const retrievedInstrumentName = instrumentObject.instrument_name
                            console.log("Found instrument!", userObject, instrumentObject)
                            callback(undefined, {username: retrievedUsername, instrumentName: retrievedInstrumentName})
                        }
                    })
                }
            })
        }
    }
}