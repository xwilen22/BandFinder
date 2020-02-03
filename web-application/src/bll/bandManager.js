const sessionValidation = require("sesssionValidation")

modules.exports = {
    createBand: function (accountname, bandName, bandInfo) {
        if (sessionValidation.validateAccountnameInSession == true) {
            //callback(bandId)
        }
        else {
            //callback(errorUnauthorized)
        }
    },

    getBandById: function (bandId, callback) {
        const bandId = parseInt(bandId)
        if (isNaN(bandId) == false) {
            //callback(error,bandId)
        }
    },

    getAllBands: function (callback) {
        //callback(error,bands)
    },

    searchAndGetBandByTitleOrGenre: function (bandname, genre) {
        //callback(error,bands)
    },

    updateBand: function (bandId, accountname, bandInfo, bandName) {
        if (sessionValidation.validateAccountnameInSession == true) {
            //callback(error, bandId)
        }
        else {
            //callback(errorUnauthorized)
        }
    },

    deleteBand: function (bandId, accountname, bandInfo, bandName) {
        if (sessionValidation.validateAccountnameInSession == true) {
            //callback(error, id)
        }
        else {
            //callback(errorUnauthorized)
        }
    }
}