const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"database",
    user:"root",
    port:"3306",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports={
    createNewUser: function(username, password, callback) {
        let query = `INSERT INTO user (username, password) VALUES ( ? , ? )`
        let values = [username,password]
        db.query(query,values,function(error) {
            callback(error, username)
        })
    },

    updateUserInfoByUsername: function(username, bio, userPicture,callback) {
        let query = `UPDATE user SET (biography, user_profile_picture) VALUES (?) WHERE (username) = (?)`
        let values=[bio,userPicture,username]
        db.query(query,values,function(error) {
            callback(error, username)
        })
    },

    updateUserPassword: function(username, password,callback) {
        let query = `UPDATE user SET password VALUES (?) WHERE (username) = (?)`
        let values = [password,username]
        db.query(query,values, function(error) {
            callback(error)
        })
    },       
    
    getUserByUsername: function(username,callback) {
        let query = `SELECT * FROM user WHERE (username) = (?)`
        db.query(query,[username],function(error, user) {
            callback(error, user)
        })
    },

    deleteUserById: function(username,callback){
        let query = `DELETE * FROM user WHERE (username) = (?)`
        db.query(query,[username],function(error) {
            callback(error)
        })
    }
}