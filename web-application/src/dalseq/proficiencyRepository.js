module.exports = function ({ db }) {
    const proficiencyModel = db.model("user_proficiency")

    return {
        createUserProficiency: function (username, instrument, proficiency, callback) {
            proficiencyModel.create({
                username,
                instrument_name:instrument,
                proficiency_level:proficiency
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        updateUserProficiencyLevel: function (username, instrument, proficiency, callback) {
            proficiencyModel.update({
                proficiency_level: proficiency
            },{
                where: {
                    instrument_name: instrument, 
                    username
                }
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        deleteUserProficiency: function (username, instrument, callback) {
            proficiencyModel.delete({
                where: {
                    username,
                    instrument_name:instrument
                }
            })
            .then(() => {
                callback(undefined, null)
            })
            .catch(error => {
                callback(error, null)
            })
        },

        getAllProficienciesByUsername: function (username, callback) {
            proficiencyModel.findAll({
                where: {
                    username
                },
                raw: true
            })
            .then(proficiencies => {
                callback(undefined, proficiencies)
            })
            .catch(error => {
                callback(error, null)
            })
        }
    }
}