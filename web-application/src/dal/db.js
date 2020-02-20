module.exports = function({}) {
    const mysql = require("mysql")
    const db = mysql.createConnection({
        host: "database",
        user: "root",
        port: "3306",
        password: "DucTreHouHa",
        database: "bandFinderDatabase"
    })
    return db
}