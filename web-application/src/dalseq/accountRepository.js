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

        getAllUserInformations: function(callback) {
            userModel.findAll({
                raw: true,
                offset,
                limit: userLimit,
                attributes: [
                    "username",
                    "biography",
                    "user_profile_picture"
                ]
            })
            .then(users => {
                callback(undefined, users)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getUserByUsername: function (username, callback) {
            userModel.findAll({
                where: {
                    username
                },
                raw: true
            })
            .then(user => {
                callback(undefined, user)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getUserInformationByUsername: function (username, callback) {
            userModel.findAll({
                where: {
                    username
                },
                attributes: [
                    "username",
                    "biography",
                    "user_profile_picture"
                ],
                raw: true
            })
            .then(userInfo => {
                callback(undefined, userInfo)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteUserByUsername: function (username, callback) {
            userModel.destroy({
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