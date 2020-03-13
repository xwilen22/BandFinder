module.exports = function ({ db }) {
    return {
        createInstrument: function (instrument, callback) {
            console.log(instrument)
            let query = `INSERT INTO instrument VALUES (?)`
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
                console.log("Retrieved instrument ", instrument)
                callback(error, instrument[0])
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