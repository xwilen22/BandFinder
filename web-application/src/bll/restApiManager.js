const jwt = require("jsonwebtoken")

const serverSecret = "34_34b935325890A024"

module.exports = function({ errorGenerator }) {
    return {
        verifyAccessToken: function(request, response, next) {
            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("Bearer ".length)
        
            jwt.verify(accessToken, serverSecret, function(error, payload) {
                if(error) {
                    response.status(401).end()
                    return
                }
                else {
                    request.userId = payload.id
                    next()
                }
            })
        },
        getNewAccessToken: function(username, callback) {
            const payload = {
                id: username
            }
            jwt.sign(payload, serverSecret, function(error, accessToken) {
                if(error) {
                    callback(errorGenerator.getInternalError(error))
                }
                else {
                    jwt.sign({ sub: username, name: username }, "4314314134315135130000", function(error, idToken) {
                        if(error) {
                            callback(errorGenerator.getInternalError(error))
                        }
                        else {
                            const responsePayload = {
                                access_token: accessToken,
                                id_token: idToken
                            }
                            callback(errorGenerator.getSuccess(), responsePayload)
                        }
                    })
                }
            })
        }
    }
}