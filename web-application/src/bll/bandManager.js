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
                callback(errorGenerator.getClientError(bandIdValidationErrors))
            }
            else {
                bandRepository.getBandById(bandId, function (error, bandObject) {
                    if (error) {
                        callback(errorGenerator.getInternalError(error))
                    }
                    else if(bandObject == undefined) {
                        callback(errorGenerator.getClientError(["Band not found!"], 404))
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

        searchAndGetBandByTitleAndGenre: function (bandName, genreName, callback) {
            bandRepository.getBandsBySearchTitle(bandName, function(error, foundBands) {
                if(error) {
                    errorGenerator.getInternalError(error)
                }
                else {
                    let returningBands = []
                    if (genreName != null || genreName != undefined || genreName.length <= 0 ) {
                        for (band of foundBands) {
                            if(band.band_genre == genreName) {
                                returningBands.push(band)
                            }
                        }
                    }
                    else {
                        returningBands = foundBands
                    }
                    callback(errorGenerator.getSuccess(), returningBands)
                }
            })
        },

        updateBandById: function (bandId, bandBio, bandName, bandGenre, callback) {
            bandRepository.updateBandById(bandId, bandName, bandBio, bandGenre, function (error, bandId) {
                if (error) {
                    console.log(error)
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), bandId)
                }
            })

        },

        deleteBand: function (bandId, callback) {
            bandRepository.deleteBandById(bandId, function(error){
                if(error){
                    callback(errorGenerator.getInternalError(error))
                }
                else{
                    callback(errorGenerator.getSuccess())
                }
            })
        }
    }
}