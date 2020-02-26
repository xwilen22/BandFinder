module.exports = function ({ db }) {
    const userModel = db.model("user")
    
    return {
        createNewUser: function (username, password, callback) {
            userModel.create({
                username,
                password
            })
            .then(user => {
                callback(undefined, user.username)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        updateUserInfoByUsername: function (username, bio, userPicture, callback) {

        },

        updateUserPassword: function (username, password, callback) {

        },

        getUserByUsername: function (username, callback) {

        },

        deleteUserByUsername: function (username, callback) {

        }
    }
}