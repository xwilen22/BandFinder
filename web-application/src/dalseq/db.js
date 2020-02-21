module.exports = function({}) {
    const sequelize = require("sequelize")

    const sequelizeClient = new sequelize('database', 'root', 'DucTreHouHa', {
        host: 'database-postgre',
        dialect: 'postgres'
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