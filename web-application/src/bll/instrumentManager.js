module.exports = function ({errorGenerator, instrumentRepository}) { 
    return {
        createInstrument: function(instrumentName, callback) {
            instrumentRepository.createInstrument(instrumentName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([])
                }
            })
        },
        deleteInstrument: function(instrumentName, callback) {
            instrumentRepository.deleteInstrumentByName(instrumentName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([])
                }
            })
        },
        getInstrumentByName: function(instrumentName, callback) {
            instrumentRepository.getInstrumentByName(instrumentName, function(error, instrument) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([], instrument)
                }
            })
        },
        getAllInstruments: function(callback) {
            instrumentRepository.getAllInstruments(function(error, instruments) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([], instruments)
                }
            })
        }
    }
}