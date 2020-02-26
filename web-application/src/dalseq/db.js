module.exports = function({}) {
    const sequelize = require("sequelize")

    const sequelizeClient = new sequelize('postDatabase', 'root', 'DucTreHouHa', {
        host: 'database-postgres',
        dialect: 'postgres',
        database: 'postDatabase'
    })

    sequelizeClient.authenticate()
        .then(() => {
            console.log("POSTGRESQL IS ALIVE!")
        })
        .catch(err => {
            console.error(`Does not work ${err}`)
        })

    return sequelizeClient
}