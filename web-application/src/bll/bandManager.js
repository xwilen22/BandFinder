const sessionValidation = require("./sessionValidation")
const bandRepository = require("../dal/bandRepository")

const ERROR_MESSAGE_OBJECT = {
    FORBIDDEN: "Forbidden",
    VALIDATION: "Failed validation"
}

module.exports = {
    createBand: function (accountnameBandLeader, bandName, bandBio, genre, callback) {
        if (sessionValidation.validateAccountnameInSession(accountname) == true) {
            bandRepository.createBand(accountnameBandLeader, bandName, bandBio, genre, function(error, bandId) {
                callback(error, bandId)
            })
        }
        else {
            callback(ERROR_MESSAGE_OBJECT.FORBIDDEN)
        }
    },

    getBandById: function (bandId, callback) {
        const bandId = parseInt(bandId)
        if (isNaN(bandId) == false) {
            bandRepository.getBandById(bandId, function(error, bandObject) {
                callback(error, bandObject)
            })
        } 
        else {
            callback(ERROR_MESSAGE_OBJECT.VALIDATION)
        }
    },

    getAllBands: function (callback) {
        bandRepository.getAllBands(function(error, allBands) {
            callback(error, allBands)
        })
    },

    searchAndGetBandByTitleOrGenre: function (bandname, genre) {
        //TODO search and get genre & title in repo
    },

    updateBand: function (bandId, accountname, bandInfo, bandName, bandGenre) {
        if (sessionValidation.validateAccountnameInSession(accountname) == true) {
            //Get band membership for specific band id and check if accountname got privledge
            //Then do this
            bandRepository.updateBandById(bandId, bandName, bandBio, bandGenre, function(error) {
                callback(error)
            })
        }
        else {
            callback(ERROR_MESSAGE_OBJECT.FORBIDDEN)
        }
    },

    deleteBand: function (bandId, accountname, bandInfo, bandName) {
        if (sessionValidation.validateAccountnameInSession(accountname) == true) {
            //Get band membership for specific band id and check if accountname got privledge
            //Then do this
            //TODO implement deleteband in repo
            //Membership repo also
        }
        else {
            let errorUnauthorized = "Forbidden"
            callback(errorUnauthorized)
        }
    }
}