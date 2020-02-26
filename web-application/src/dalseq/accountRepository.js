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
            userModel.update({
                biography: bio, 
                user_profile_picture: userPicture
            },{
                where: {
                    username
                }
            })
            .then(user => {
                callback(undefined, user.username)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        updateUserPassword: function (username, password, callback) {
            userModel.update({
                password
            },{
                where: {
                    username
                }
            })
            .then(user => {
                callback(undefined, user.username)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getUserByUsername: function (username, callback) {
            userModel.findAll({
                where: {
                    username
                }
            })
            .then(user => {
                callback(undefined, user)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteUserByUsername: function (username, callback) {
            userModel.delete({
                where: {
                    username
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