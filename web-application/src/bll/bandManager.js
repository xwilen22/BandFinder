module.exports = function ({sessionValidation, bandRepository}) {
    
    const ERROR_MESSAGE = {
        getStatusError: function (statusCode) {
            return {
                stayOnPage: false,
                code: statusCode,
                message: errorList[statusCode]
            }
        },
        getMessageError: function (statusCode, messageOverride) {
            return {
                stayOnPage: true,
                code: statusCode,
                message: messageOverride
            }
        },
    }

    return {
        createBand: function (accountnameBandLeader, bandName, bandBio, genre, callback) {
            bandRepository.createBand(accountnameBandLeader, bandName, bandBio, genre, function (error, bandId) {
                callback(error, bandId)
            })
        },

        getBandById: function (bandId, callback) {
            //const bandId = parseInt(bandId)
            if (isNaN(bandId) == false) {
                bandRepository.getBandById(bandId, function (error, bandObject) {
                    callback(error, bandObject)
                })
            }
            else {
                callback()
            }
        },

        getAllBands: function (callback) {
            bandRepository.getAllBands(function (error, allBands) {
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
                bandRepository.updateBandById(bandId, bandName, bandBio, bandGenre, function (error) {
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
}