const Express = require("express")

module.exports = function ({accountManager, accountValidation, restApiManager, sessionValidation}) {
    const router = Express.Router()
    //Get all accounts
    router.get("/", function (request, response) {
        accountManager.getAllAccountsInformation(function (error, accounts) {
            if (error) {
                response.status(error.code).end()
            }
            else {
                response.status(200).json(accounts)
            }
        })
    })
    //Create
    router.post("/", function (request, response) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signUpAccount(username, password, function (error, createdUsername) {
            if (error) {
                response.status(error.code).end()
            }
            else {
                response.status(201).json(createdUsername)
            }
        })
    })
    //Get user
    router.get("/:username", function (request, response) {
        const username = request.params.username

        accountManager.getAccountInformationByUsername(username, function(error, account) {
            if(error) {
                console.log(error)
                response.status(error.code).end()
            }
            else {
                response.status(200).json(account)
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
                restApiManager.getNewAccessToken(username, function(error, responsePayload) {
                    if(error) {
                        response.status(error.code).end()
                    }
                    else {
                        response.status(201).json(responsePayload)
                    }
                })
            }
        })
    })
    //Update user
    router.put("/:username", restApiManager.verifyAccessToken, function (request, response) {
        const username = request.params.username
        const biographyText = request.body.biography

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
    router.delete("/:username", restApiManager.verifyAccessToken, function (request, response) {
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