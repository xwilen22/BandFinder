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
        createSubGenreOf: function(parentGenreName, subGenreName, callback) {
            genreRepository.createSubGenreOf(parentGenreName, subGenreName, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback([])
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
            genreRepository.getAllGenres(function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                } 
                else {
                    callback([])
                }
            })
        },
        getAllSubGenresOf: function(parentGenreName, callback) {

        },
        getGenreByName: function(genreName, callback) {

        }
    }
}