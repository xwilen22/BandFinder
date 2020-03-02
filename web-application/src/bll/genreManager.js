module.exports = function ({errorGenerator, genreRepository}) { 
    return {
        createGenre: function(genreName, callback) {
            genreRepository.createGenre(genreName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback([])
                }
            })
        },
        createSubGenreOf: function (parentGenreName, subGenreName, callback) {
            genreRepository.getGenreByName(parentGenreName, function (getError, parentGenre) {
                if (getError) {
                    callback(errorGenerator.getInternalError(getError))
                }
                else if (parentGenre == null){
                    callback(errorGenerator.getClientError(["Parent genre does not exist!"]))
                }
                else {
                    const retrievedParentName = parentGenre[0].genre_name
                    genreRepository.createSubGenreOf(retrievedParentName, subGenreName, function (createError) {
                        if (createError) {
                            callback(errorGenerator.getInternalError(createError))
                        }
                        else {
                            callback([])
                        }
                    })
                }
            })
        },
        deleteGenreByName: function(genreName, callback) {
            genreRepository.deleteGenreByName(genreName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback([])
                }
            })
        },
        getAllGenres: function(callback) {
            genreRepository.getAllGenres(function(error, genres) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    //GET ALL GENRES, Present in some kind of structure? Like and object with an array of subgenres
                    const returningGenres = []
                    console.log("Genres from db: ", genres)
                    genres.forEach(function(item, index) {
                        if(item.parent_genre == null) {
                            returningGenres.push({
                                headGenreName: item.genre_name,
                                subGenres: []
                            })
                        } else {
                            const headGenreIndex = returningGenres.findIndex((element) => element.headGenre == item.parent_genre)
                            console.log("HeadGenreIndex", headGenreIndex)
                            returningGenres[headGenreIndex].subGenres.push(item.genre_name)
                        }
                    })

                    callback([], returningGenres)
                }
            })
        },
        getAllSubGenresOf: function(parentGenreName, callback) {
            genreRepository.getSubGenresByParentGenre(parentGenreName, function(error, subGenres) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback([], subGenres)
                }
            })
        },
        getGenreByName: function(genreName, callback) {
            genreRepository.getGenreByName(genreName, function(error, genre) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback([], genre)
                }
            })
        }
    }
}