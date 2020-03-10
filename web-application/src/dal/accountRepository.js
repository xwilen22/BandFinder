module.exports = function ({ db }) {
    return {
        createNewUser: function (username, password, callback) {
            let query = `INSERT INTO user (username, password) VALUES ( ? , ? )`
            let values = [username, password]
            db.query(query, values, function (error) {
                callback(error, username)
            })
        },

        updateUserInfoByUsername: function (username, bio, userPicture, callback) {
            let query = `UPDATE user 
                         SET biography = ?, user_profile_picture = ? 
                         WHERE username = ?`
            let values = [bio, userPicture, username]
            db.query(query, values, function (error) {
                callback(error, username)
            })
        },

        updateUserPassword: function (username, password, callback) {
            let query = `UPDATE user 
                         SET password = ? 
                         WHERE username = ?`
            let values = [password, username]
            db.query(query, values, function (error) {
                callback(error)
            })
        },

        getUserByUsername: function (username, callback) {
            let query = `SELECT * FROM user 
                         WHERE username = ?`
            let values = [username]
            db.query(query, values, function (error, user) {
                callback(error, user)
            })
        },

        getUserInformationByUsername: function (username, callback) {
            let query = `SELECT (username, biography, user_profile_picture) FROM user
                         WHERE username = ?`
            let values = [username]

            db.query(query, values, function(error, userInfo) {
                callback(error, userInfo)
            })
        },

        deleteUserByUsername: function (username, callback) {
            let query = `DELETE FROM (user, band_membership, user_proficiency) 
                         USING user INNERJOIN band_membership INNERJOIN user_proficiency 
                         WHERE user.username = ? AND band_membership.username = ? AND user_proficiency.username = ?`
            db.query(query, [username], function (error) {
                callback(error)
            })
        }
    }
}