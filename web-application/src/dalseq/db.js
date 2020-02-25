module.exports = function({}) {
    const sequelize = require("sequelize")

    const sequelizeClient = new sequelize('postDatabase', 'root', 'DucTreHouHa', {
        host: 'database-postgre',
        dialect: 'postgres',
        database: 'postDatabase'
    })

    sequelizeClient.authenticate()
        .then(() => {
            console.log("Works!")
        })
        .catch(err => {
            console.error("Does not work")
        })

    return sequelizeClient
}