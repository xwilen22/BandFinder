module.exports = function ({ applicationRepository, errorGenerator }) {
    return {
        createApplication: function(bandId, username, callback) {
            applicationRepository.createApplication(username, bandId, function(error) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess())
                }
            })
        },
        getApplicationsByBandId: function(bandId, callback) {
            applicationRepository.getApplicationsByBandId(bandId, function(error, applications) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), applications)
                }
            })
        },
        getApplicationsByUsername: function(username, callback) {
            applicationRepository.getApplicationsByUsername(username, function(error, applications) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    callback(errorGenerator.getSuccess(), applications)
                }
            })
        },
        deleteApplication: function(username, bandId, callback) {
            applicationRepository.deleteApplication(bandId, username, function(error) {
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