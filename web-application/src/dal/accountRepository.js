const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports={
    createNewUser: function(username, password, callback){
        let query = `INSERT INTO user (username, password) VALUES ?`
        let values=[username,password]
        db.query(query,[values],function(error, user){
            if(error){
                callback(error)
            }
            else{
                callback(user)
            }
        })
    },

    updateUserInfoById: function(username, bio, userPicture,callback){
        let query = `UPDATE user SET (biography, user_profile_picture) VALUES ? WHERE username = ?`
        let values=[bio,userPicture,username]
        db.query(query,[values],function(error,user){
            if(error){
                callback(error)
            }
            else{
                callback(user)
            }
        })
    },

    updateUserPassword: function(username, password,callback){
        let query = `UPDATE user SET password VALUES ? WHERE username = ? `
        let values=[password,username]
        db.query(query,[values], function(error,user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },       
    
    getUserById: function(username,callback){
        let query = `SELECT * FROM user WHERE username = ?`
        db.query=(query,[username],function(error, user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },

    deleteUserById: function(username,callback){
        let query = `DELETE FROM user WHERE username = ?`
        db.query =(query,[username],function(error){
            callback(error)
        })
    }
}