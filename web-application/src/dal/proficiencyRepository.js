const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"database",
    user:"root",
    port:"3306",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports = {
    createUserProficiency: function(username, instrument, proficiency, callback){
        let query = `INSERT INTO user_proficiency (username, instrument_name, proficiency_level) VALUES (? , ? , ?)`
        let values = [username, instrument, proficiency]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    updateUserProficiencyLevel: function(username, instrument, proficiency, callback){
        let query = `UPDATE user_proficiency 
                     SET proficiency_level = ? 
                     WHERE instrument_name = ? AND username = ?`
        let values = [proficiency,instrument,username]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    deleteUserProficiency: function(username, instrument, callback){
        let query = `DELETE * FROM user_proficiency 
                     WHERE username = ? AND instrument_name = ?`
        let values = [username, instrument]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    getAllProficiencyByUsername: function(username, callback){
        let query = `SELECT * FROM user_proficiency 
                     WHERE username = ?`
        db.query(query,[username],function(error, proficiencies){
            if(error){
                callback(error)
            }
            else{
                callback(proficiencies)
            }
        })
    }
}