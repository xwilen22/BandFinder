module.exports = function({}) {
    const {Sequelize, DataTypes} = require("sequelize")

    const sequelizeClient = new Sequelize('postDatabase', 'root', 'DucTreHouHa', {
        host: 'database-postgre',
        dialect: 'postgres',
        database: 'postDatabase'
    })

    sequelizeClient.authenticate()
        .then(() => {
            console.log("POSTGRESQL & SEQUELIZE IS ALIVE!")
        })
        .catch(err => {
            console.error(`POSTGRESQL ERROR: ${err}`)
        })
    
    //TABLES INITALIZING
    const user = sequelizeClient.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_profile_picture: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
    const genre = sequelizeClient.define("genre", {
        genre_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    })
    genre.hasOne(genre, {
        as: "parent_genre", 
        foreignKey: "genre_name"
    })
    const band = sequelizeClient.define("band", {
        band_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        band_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        band_biography: {
            type: DataTypes.TEXT
        },
        band_genre: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: genre,
                key: "genre_name"
            }
        },
        max_members: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        band_profile_picture: {
            type: DataTypes.TEXT
        }
    })
    const instrument = sequelizeClient.define("instrument", {
        instrument_name: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    })
    const user_proficiency = sequelizeClient.define("user_proficiency", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: user,
                key: "username"
            }
        },
        instrument_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: instrument,
                key: "instrument_name"
            }
        },
        proficiency_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    const band_membership = sequelizeClient.define("band_membership", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: user,
                key: "username"
            }
        },
        band_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: band,
                key: "band_id"
            }
        },
        is_band_leader: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    sequelizeClient.sync()        
        .then(() => {
            console.log("SYNCED")
        })
        .catch(err => {
            console.error(`POSTGRESQL ERROR: ${err}`)
        })

    return sequelizeClient
}