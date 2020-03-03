module.exports = function ({}) {
    const BANDNAME_MIN_LENGTH = 2
    const BANDNAME_MAX_LENGTH = 20 
    
    return {
        getNameValidationErrors: function(bandName) {
            let validationErrors = []

            if (bandName > BANDNAME_MAX_LENGTH) {
                validationErrors.push(`Band name too long! Keep the name under ${BANDNAME_MAX_LENGTH} characters`)
            }
            if (bandName < BANDNAME_MIN_LENGTH) {
                validationErrors.push(`Band name too short! At least ${BANDNAME_MIN_LENGTH} characters`)
            }

            return validationErrors
        },
        getBandIdValidationErrors: function(bandId) {
            let validationErrors = []
            
            const parsedBandId = parseInt(bandId)

            if (isNaN(parsedBandId) == true) {
                validationErrors.push("Invalid band id")
            }

            return validationErrors
        }
    }
}