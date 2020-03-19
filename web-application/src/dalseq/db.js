let connectionAuthenticated = false
let databaseSynced = false

const waitTimeMilliseconds = 1000

module.exports = function({}) {
    const {Sequelize, DataTypes} = require("sequelize")

    const sequelizeClient = new Sequelize('postDatabase', 'root', 'DucTreHouHa', {
        host: 'database-postgre',
        dialect: 'postgres',
        database: 'postDatabase',
        omitNull: true
    })
    
    function awaitSync() {
        sequelizeClient.authenticate()
        .then(() => {
            console.log("POSTGRESQL & SEQUELIZE IS ALIVE!")
            connectionAuthenticated = true

            sequelizeClient.sync()
            .then(() => {
                sequelizeClient.query(`ALTER TABLE bands ADD COLUMN IF NOT EXISTS tsv tsvector`)
                console.log("SYNCED")
            })
            .catch(err => {
                console.error(`POSTGRESQL ERROR: ${err}`)
            })
        })
        .catch(err => {
            console.error(`POSTGRESQL ERROR: ${err}`)
            setTimeout(awaitSync, waitTimeMilliseconds)
        })
    }
    
    setTimeout(awaitSync, waitTimeMilliseconds)

    //TABLES INITALIZING
    const user = sequelizeClient.define("user", {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
    const genre = sequelizeClient.define("genre", {
        genre_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        parent_genre: {
            type: DataTypes.STRING(20)
        }
    })
    genre.hasOne(genre, {
        foreignKey: "parent_genre",
        onDelete: "cascade"
    })
    const band = sequelizeClient.define("band", {
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
            unique: true,
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
    user_proficiency.belongsTo(user,{
        foreignKey: "username",
        onDelete: "CASCADE"
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
                key: "id"
            }
        },
        is_band_leader: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    band_membership.belongsTo(band,{
        foreignKey: "id",
        onDelete: "CASCADE"
    })
    band_membership.belongsTo(user,{
        foreignKey: "username",
        onDelete: "CASCADE"
    })
    const band_application = sequelizeClient.define("band_application", {
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
                key: "id"
            }
        }
    })
    
    return sequelizeClient
}
function wait() {
    if (connectionAuthenticated == false) {
        setTimeout(wait, waitTimeMilliseconds)
    }
}