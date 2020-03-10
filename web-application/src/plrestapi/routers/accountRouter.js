const Express = require("express")
const jwt = require("jsonwebtoken")

const serverSecret = "34_34b935325890A024"

module.exports = function ({accountManager, accountValidation, errorGenerator, sessionValidation}) {
    const router = Express.Router()
    //Get user
    router.get("/:username", function (request, response) {
        const username = request.params.username

        accountManager.getAccountByUsername(username, function(error, account) {
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
                        jwt.sign({ sub: username, name: username }, "hjälpjagfårenstroke", function(error, idToken) {
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

                /*jwt.sign(payload, serverSecret)
                .then(accessToken => {
                    jwt.sign({
                        sub: username, name: username
                    }, "hjälpjagfårenstroke")
                    .then(idToken => {
                        response.status(200).json({
                            access_token: accessToken,
                            id_token: idToken
                        })
                    })
                    .catch(error => {
                        response.status(500).end()
                    })
                })
                .catch(error => {
                    response.status(500).end()
                })*/
            }
        })
    })
    //Update user
    router.put("/:username", function (request, response) {
        const username = request.params.username
        const biographyText = request.body.biography

        accountManager.updateAccountBiography(username, biographyText, function(error) {
            if(error) {

            }
            else {

            }
        })
    })
    //Delete user
    router.delete("/:username", function (request, response) {
        const username = request.params.username

    })
    return router
}
function verifyAccessToken(request, response, next) {
    const authorizationHeader = request.get('authorization')
    const accessToken = authorizationHeader.substr("Bearer ".length)

    jwt.verify(accessToken, serverSecret)
    .then(payload => {
        
    })
    .catch(error => {
        response.status(401).end()
        next()
    })
}