module.exports = function ({ db }) {
    return {
        createUserProficiency: function (username, instrument, proficiency, callback) {
            console.log("This is name ", instrument)
            let query = `INSERT INTO user_proficiency (username, instrument_name, proficiency_level) VALUES (? , ? , ?)`
            let values = [username, instrument, proficiency]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        updateUserProficiencyLevel: function (username, instrument, proficiency, callback) {
            let query = `UPDATE user_proficiency 
                         SET proficiency_level = ? 
                         WHERE instrument_name = ? AND username = ?`
            let values = [proficiency, instrument, username]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        deleteUserProficiency: function (username, instrument, callback) {
            let query = `DELETE FROM user_proficiency 
                         WHERE username = ? AND instrument_name = ?`
            let values = [username, instrument]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        getAllProficienciesByUsername: function (username, callback) {
            let query = `SELECT * FROM user_proficiency 
                         WHERE username = ?`
            db.query(query, [username], function (error, proficiencies) {
                callback(error, proficiencies)
            })
        }
    }
}