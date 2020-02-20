module.exports = function ({}) {

    const PASSWORD_MIN_LENGTH = 6
    const ACCOUNTNAME_MIN_LENGTH = 4
    const ACCOUNTNAME_MAX_LENGTH = 20

    return {
        passwordValidation: function (password) {
            return password.length >= PASSWORD_MIN_LENGTH
        },

        accountNameValidation: function (accountName) {
            return (accountName.length >= ACCOUNTNAME_MIN_LENGTH && accountName.length <= ACCOUNTNAME_MAX_LENGTH)
        },

        getValidationErrors: function(passwordPlain, accountName) {
            let validationErrors = []

            if (passwordPlain.length < PASSWORD_MIN_LENGTH)
                validationErrors.push(`Password to short! Use at least ${PASSWORD_MIN_LENGTH} characters`)
            if (accountName.length < ACCOUNTNAME_MIN_LENGTH)
                validationErrors.push(`Username to short! Use at least ${ACCOUNTNAME_MIN_LENGTH} characters`)
            if (accountName.length > ACCOUNTNAME_MAX_LENGTH)
                validationErrors.push(`Username to long! Keep the name under ${ACCOUNTNAME_MAX_LENGTH} characters`)
            
            return validationErrors
        }
    }
}