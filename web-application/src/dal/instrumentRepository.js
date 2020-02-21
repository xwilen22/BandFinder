module.exports = function ({ db }) {
    return {
        createInstrument: function (instrument, callback) {
            let query = `INSERT INTO instrument (instrument_name) VALUES (?)`
            db.query(query, [instrument], function (error) {
                callback(error)
            })
        },

        getAllInstruments: function (callback) {
            let query = `SELECT * FROM instrument`
            db.query(query, function (error, instruments) {
                callback(error, instruments)
            })
        },

        getInstrumentByName: function (instrumentName, callback) {
            let query = `SELECT * FROM instrument 
                         WHERE instrument_name = ?`
            db.query(query, [instrumentName], function (error, instrument) {
                callback(error, instrument)
            })
        },

        deleteInstrumentByName: function (instrumentName, callback) {
            let query = `DELETE FROM instrument
                         WHERE instrument_name = ?`
            let values = [instrumentName]
            db.query(query, values, function(error) {
                callback(error)
            })
        }
    }
}