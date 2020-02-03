const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports={
    createNewUser: function(accountname, password, bio, picture,callback){
        let query = `INSERT INTO user (accountname, password, bio, picture) VALUES ?`
        let values=[accountname,password,bio,picture]
        db.query(query,[values],function(error, user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },

    updateUserInfoById: function(accountname, bio, picture,callback){
        let query = `UPDATE user SET (bio, picture) VALUES ? WHERE accountname = ?`
        let values=[bio,picture,accountname]
        db.query(query,[values],function(error,user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },

    updateUserPassword: function(accountname, password,callback){
        let query = `UPDATE user SET password VALUES ? WHERE accountname = ? `
        let values=[password,accountname]
        db.query(query,[values], function(error,user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },       
    
    getUserById: function(accountname,callback){
        let query = `SELECT * FROM user WHERE accountname = ?`
        db.query=(query,[accountname],function(error, user){
            if(error){

            }
            else{
                callback(user)
            }
        })
    },

    deleteUserById: function(accountname,callback){
        let query = `DELETE FROM user WHERE accountname = ?`
        db.query =(query,[accountname],function(error){
            callback(error)
        })
    }
}