module.exports = function ({ db }) {
    const instrumentModel = db.model("instrument")
    
    return {
        createInstrument: function (instrument, callback) {
            instrumentModel.create({
                instrument_name:instrument
            })
            .then(() => {
                callback(undefined)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getAllInstruments: function (callback) {
            instrumentModel.findAll({
                raw: true
            })
            .then(instruments => {
                callback(undefined, instruments)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getInstrumentByName: function (instrumentName, callback) {
            instrumentModel.findAll({
                where: {
                    instrument_name:instrumentName
                }
            })
            .then(instrument => {
                callback(undefined, instrument)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteInstrumentByName: function (instrumentName, callback) {
            userModel.delete({
                where: {
                    instrument_name:instrumentName
                }
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        }
    }
}