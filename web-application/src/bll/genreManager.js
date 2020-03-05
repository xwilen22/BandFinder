module.exports = function ({errorGenerator, genreRepository, genreValidation}) { 
    return {
        createGenre: function(genreName, callback) {
            const retrievedGenreName = genreValidation.getValidGenreName(genreName)
            const nameValidationErrors = genreValidation.getNameValidationErrors(retrievedGenreName)

            if (nameValidationErrors.length > 0) {
                callback(errorGenerator.getClientError(nameValidationErrors))
            }
            else {
                genreRepository.createGenre(retrievedGenreName, function (createError) {
                    if (createError) {
                        callback(errorGenerator.getInternalError(createError))
                    }
                    else {
                        callback(errorGenerator.getSuccess())
                    }
                })
            }
        },
        createSubGenreOf: function (parentGenreName, subGenreName, callback) {
            const retrievedChildGenreName = genreValidation.getValidGenreName(subGenreName)

            const childNameValidationErrors = genreValidation.getNameValidationErrors(retrievedChildGenreName)
            const parentNameValidationErrors = genreValidation.getNameValidationErrors(parentGenreName)

            if (childNameValidationErrors.length > 0 || parentNameValidationErrors.length > 0) {
                callback(errorGenerator.getClientError(childNameValidationErrors.concat(parentNameValidationErrors)))
            }
            else {
                genreRepository.getGenreByName(parentGenreName, function (getError, parentGenre) {
                    if (getError) {
                        callback(errorGenerator.getInternalError(getError))
                    }
                    else if (parentGenre == null) {
                        callback(errorGenerator.getClientError(["Parent genre does not exist!"]))
                    }
                    else {
                        const retrievedParentName = parentGenre[0].genre_name
                        genreRepository.createSubGenreOf(retrievedParentName, retrievedChildGenreName, function (createError) {
                            if (createError) {
                                callback(errorGenerator.getInternalError(createError))
                            }
                            else {
                                callback(errorGenerator.getSuccess())
                            }
                        })
                    }
                })
            }
        },
        deleteGenreByName: function(genreName, callback) {
            genreRepository.deleteGenreByName(genreName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        getAllGenres: function(callback) {
            genreRepository.getAllGenres(function(error, genres) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    const returningGenres = []

                    genres.forEach(function(item) {
                        if(item.parent_genre == null) {
                            returningGenres.push({
                                headGenreName: item.genre_name,
                                subGenres: []
                            })
                        } else {
                            const headGenreIndex = returningGenres.findIndex((element) => element.headGenreName == item.parent_genre)
                            if(headGenreIndex != -1) {
                                returningGenres[headGenreIndex].subGenres.push(item.genre_name)
                            }
                        }
                    })

                    callback(errorGenerator.getSuccess(), returningGenres)
                }
            })
        },
        getAllSubGenresOf: function(parentGenreName, callback) {
            genreRepository.getSubGenresByParentGenre(parentGenreName, function(error, subGenres) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback(errorGenerator.getSuccess(), subGenres)
                }
            })
        },
        getGenreByName: function(genreName, callback) {
            genreRepository.getGenreByName(genreName, function(error, genre) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), genre)
                }
            })
        }
    }
}