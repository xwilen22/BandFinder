const express = require("express")

module.exports = function ({ proficiencyManager, restApiManager, sessionValidation }) {
    const router = express.Router()
    //Create for user
    router.post("/", restApiManager.verifyAccessToken, function (request, response, next) {
        const username = request.body.username
        const instrumentName = request.body.instrumentName
        const skillLevelNumber = request.body.skillLevelNumber

        if (sessionValidation.validateAccountNameInSession(username, request.userId) == true) {
            proficiencyManager.createProficiency(username, instrumentName, skillLevelNumber, function (error) {
                if (error) {
                    response.status(error.code).end()
                }
                else {
                    response.status(201).end()
                }
            })
        }
        else {
            response.status(401).end()
        }

    })
    //Get for username
    router.get("/:username", function(request, response) {
        const username = request.params.username
        proficiencyManager.getAllProficienciesForUser(username, function(error, proficiencies) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(200).json(proficiencies)
            }
        })
    })
    //Update
    router.put("/:forUsername/:instrumentName", restApiManager.verifyAccessToken, function(request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName
        const skillLevelNumber = request.body.skillLevelNumber
        if (sessionValidation.validateAccountNameInSession(username, request.userId) == true) {
            proficiencyManager.updateProficiencyLevelForUser(username, instrumentName, skillLevelNumber, function (error) {
                if (error) {
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
    //Delete
    router.delete("/:forUsername/:instrumentName", restApiManager.verifyAccessToken, function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName
        if (sessionValidation.validateAccountNameInSession(username, request.userId) == true) {
            proficiencyManager.deleteProficiencyForUser(username, instrumentName, function (error) {
                if (error) {
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
    
    return router
}