module.exports = function ({ accountRepository, errorGenerator }) {
    return {
        createApplication: function(bandId, username, callback) {
            accountRepository.createApplication(bandId, username, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        getApplicationsByBandId: function(bandId, callback) {
            accountRepository.getApplicationsByBandId(bandId, function(error, applications) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), applications)
                }
            })
        },
        getApplicationsByUsername: function(username, callback) {
            accountRepository.getApplicationsByUsername(username, function(error, applications) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), applications)
                }
            })
        },
        deleteApplication: function(username, bandId, callback) {
            accountRepository.deleteApplication(bandId, username, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        } 
    }
}