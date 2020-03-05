module.exports = function ({ sessionValidation, bandRepository, bandValidation, errorGenerator }) {  
    return {
        createBand: function (bandName, bandBio, genre, maxBandMembers, callback) {
            const bandNamevalidationErrors = bandValidation.getNameValidationErrors(bandName)

            if (bandNamevalidationErrors.length > 0) {
                callback(bandNamevalidationErrors)
            }
            else {
                bandRepository.createBand(bandName, bandBio, genre, maxBandMembers, function (error, bandId) {
                    if (error) {
                        callback(errorGenerator.getInternalError(error), null)
                    }
                    else {
                        callback(errorGenerator.getSuccess(), bandId)
                    }
                })
            }
        },

        getBandById: function (bandId, callback) {
            const bandIdValidationErrors = bandValidation.getBandIdValidationErrors(bandId)

            if(bandIdValidationErrors.length > 0) {
                callback(bandIdValidationErrors)
            }
            else {
                bandRepository.getBandById(bandId, function (error, bandObject) {
                    if (error) {
                        callback(errorGenerator.getInternalError(error))
                    }
                    else {
                        callback(errorGenerator.getSuccess(), bandObject)
                    }
                })
            }
        },

        getAllBands: function (callback) {
            bandRepository.getAllBands(function (error, allBands) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), allBands)
                }
            })
        },

        searchAndGetBandByTitleOrGenre: function (bandname, genre) {
            //TODO search and get genre & title in repo
        },

        updateBandById: function (bandId, bandInfo, bandName, bandGenre) {
            bandRepository.updateBandById(bandId, bandName, bandBio, bandGenre, function (error) {
                if (error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })

        },

        deleteBand: function (bandId, sessionAccountName, bandInfo, bandName) {
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