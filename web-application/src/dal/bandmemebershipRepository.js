const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports = {
    createBandMembership: function(username, bandId, isBandleader,callback){
        let query = `INSERT INTO band_membership (username,band_id,is_band_leader) VALUES ?`
        let values = [username,bandId,isBandleader]
        db.query(query,[values],function(error){
            callback(error)
        })
    },

    updateBandMemberToLeader: function(username, bandId, isBandleader, callback){
        let query = `UPDATE band_memebership SET (is_band_leader) VALUES ? WHERE (username,band_id) = ? `
        let values = [isBandleader,username,bandId]
        db.query(query, [values], function(error){
            callback(error)
        })
    },
    
    deleteBandMembership: function(username, bandId, callback){
        let query = `DELETE FROM band_membership WHERE (username, band_id) = ?`
        let values = [username, bandId]
        db.query(query,[values],function(error){
            callback(error)
        })
    }
}