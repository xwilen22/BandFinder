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
                if (error) {
                    callback(error)
                }
                else {
                    callback(instruments)
                }
            })
        },

        getInstrumentByName: function (instrumentName, callback) {
            let query = `SELECT * FROM instrument 
                         WHERE instrument_name = ?`
            db.query(query, [instrument], function (error, instrument) {
                if (error) {
                    callback(error)
                }
                else {
                    callback(instrument)
                }
            })
        },

        deleteInstrumentByName: function (instrument, callback) {
            
        }
    }
}