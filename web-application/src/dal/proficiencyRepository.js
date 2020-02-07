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
        let query = `INSERT INTO user_proficency (username, instrument_name, proficency_level) VALUES (? , ? , ?)`
        let values = [username, instrument, proficiency]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    updateUserProficiencyLevel: function(username, instrument, proficiency, callback){
        let query = `UPDATE user_proficency SET (proficency) VALUES (?) WHERE (instrument_name) = (?) AND (username) = (?)`
        let values = [proficiency,instrument,username]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    deleteUserProficiency: function(username, instrument, callback){
        let query = `DELETE * FROM user_proficency WHERE (username) = (?) AND (instrument_name) = (?)`
        let values = [username, instrument]
        db.query(query,values,function(error){
            callback(error)
        })
    },

    getAllProficiencyByUsername: function(username, callback){
        let query = `SELECT * FROM user_proficency WHERE (username) = (?)`
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