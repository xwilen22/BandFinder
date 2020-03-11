const Express = require("express")
const jwt = require("jsonwebtoken")

const serverSecret = "34_34b935325890A024"

module.exports = function ({accountManager, accountValidation, errorGenerator, sessionValidation}) {
    const router = Express.Router()
    //Get user
    router.get("/:username", function (request, response) {
        const username = request.params.username

        accountManager.getAccountInformationByUsername(username, function(error, account) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(200).json(account)
            }
        })
    })
    //Create
    router.post("/", function(request, response) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signUpAccount(username, password, function(error, createdUsername) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(201).json(createdUsername)
            }
        })
    })
    //Get access token
    router.post("/tokens", function (request, response) {
        const username = request.body.username
        const password = request.body.password
        const grantType = request.body.grant_type

        if(grantType != "password") {
            response.status(400).json({
                error: "unsupported_grant_type"
            })
            return
        }
        if(accountValidation.getValidationErrors(password, username).length > 0) {
            response.status(400).json({
                error: "invalid_request"
            })
            return
        }
        accountManager.signInAccount(username, password, function(error) {
            if(error) {
                const errorCodeString = String(error.code)
                if(errorCodeString.charAt(0) == "4") {
                    response.status(400).json({
                        error: "invalid_grant"
                    })
                }
                else {
                    response.status(error.code).end()
                }
            }
            else {
                const payload = {
                    id: username
                }
                jwt.sign(payload, serverSecret, function(error, accessToken) {
                    console.log(error, accessToken)
                    if(error) {
                        response.status(500).end()
                    }
                    else {
                        jwt.sign({ sub: username, name: username }, "4314314134315135130000", function(error, idToken) {
                            if(error) {
                                response.status(500).end()
                            }
                            else {
                                response.status(200).json({
                                    access_token: accessToken,
                                    id_token: idToken
                                })
                            }
                        })
                    }
                })
            }
        })
    })
    //Update user
    router.put("/:username", verifyAccessToken, function (request, response) {
        const username = request.params.username
        const biographyText = request.body.biography

        console.log("PAPA JUJU", request.userId)

        if(sessionValidation.validateAccountNameInSession(username, request.userId) == true) {
            accountManager.updateAccountBiography(username, biographyText, function(error) {
                if(error) {
                    response.status(error.code).end()
                }
                else {
                    response.status(204).end()
                }
            })
        }
        else {
            response.status(401).end()
        }
    })
    //Delete user
    router.delete("/:username", verifyAccessToken, function (request, response) {
        const username = request.params.username
        const password = request.body.password

        if(sessionValidation.validateAccountNameInSession(username, request.userId) == true) {
            accountManager.deleteAccount(username, password, function(error) {
                if(error) {
                    response.status(error.code).end()
                }
            })
        }
        else {
            response.status(401).end()
        }
    })
    return router
}
function verifyAccessToken(request, response, next) {
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
}