module.exports = function ({}) {
    const GENRE_MIN_LENGTH = 2
    const GENRE_MAX_LENGTH = 20 
    
    return {
        getValidGenreName: function(genreName) {
            const retrievedGenreName = String(genreName)
            
            retrievedGenreName = retrievedGenreName.trim()
            retrievedGenreName = retrievedGenreName.replace("\s", "-")

            return retrievedGenreName
        },
        getNameValidationErrors: function(genreName) {
            let validationErrors = []
            
            if(genreName.length > GENRE_MAX_LENGTH) {
                validationErrors.push(`Genre name too long! Max ${GENRE_MAX_LENGTH} characters`)
            }
            if(genreName.length < GENRE_MIN_LENGTH) {
                validationErrors.push(`Genre name too short! At least ${GENRE_MIN_LENGTH} characters`)
            }

            return validationErrors
        }
    }
}