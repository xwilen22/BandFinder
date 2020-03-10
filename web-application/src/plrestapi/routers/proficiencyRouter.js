const express = require("express")

module.exports = function ({ proficiencyManager }) {
    const router = express.Router()
    //Create for user
    router.post("/", function (request, response, next) {
        const username = request.body.username
        const instrumentName = request.body.instrumentName
        const skillLevelNumber = request.body.skillLevelNumber

        proficiencyManager.createProficiency(username, instrumentName, skillLevelNumber, function(error) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(201).end()
            }
        })

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
    router.put("/:forUsername/:instrumentName", function(request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName
        const skillLevelNumber = request.body.skillLevelNumber

        proficiencyManager.updateProficiencyLevelForUser(username, instrumentName, skillLevelNumber, function(error) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(201).end()
            }
        })
    })
    //Delete
    router.delete("/:forUsername/:instrumentName", function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName

        proficiencyManager.deleteProficiencyForUser(username, instrumentName, function(error) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(204).end()
            }
        })
    })
    return router
}