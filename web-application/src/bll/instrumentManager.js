module.exports = function ({errorGenerator, instrumentRepository}) { 
    return {
        createInstrument: function(instrumentName, callback) {
            instrumentRepository.createInstrument(instrumentName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        deleteInstrument: function(instrumentName, callback) {
            instrumentRepository.deleteInstrumentByName(instrumentName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        getInstrumentByName: function(instrumentName, callback) {
            instrumentRepository.getInstrumentByName(instrumentName, function(error, instrument) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else if(instrument.length <= 0) {
                    callback(errorGenerator.getClientError(["No instrument found!"], 404))
                }
                else {
                    callback(errorGenerator.getSuccess(), instrument)
                }
            })
        },
        getAllInstruments: function(callback) {
            instrumentRepository.getAllInstruments(function(error, instruments) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), instruments)
                }
            })
        }
    }
}