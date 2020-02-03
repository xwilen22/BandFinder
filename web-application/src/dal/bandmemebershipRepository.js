const mysql =  require("mysql")
const db = mysql.createConnection({
    host:"db",
    user:"root",
    password:"DucTreHouHa",
    database: "bandFinderDatabase"
})

module.exports = {
    createBandMembership: function(username, bandId, isBandleader,callback){
        let query = `INSERT INTO band_memebership (username,band_id,is_band_leader) VALUES ?`
        let values = [username,bandId,isBandleader]
        db.query(query,[values],)
    }
}