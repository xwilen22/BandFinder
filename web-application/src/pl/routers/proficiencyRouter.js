const express = require("express")

module.exports = function ({ proficiencyManager }) {
    const router = express.Router()

    router.post("/create/:forUsername", function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.body.instrument
        const proficiencySkillLevel = request.body.skillLevel

        console.log("CREATING PROF: ", username, instrumentName, proficiencySkillLevel)

        proficiencyManager.createProficiency(username, instrumentName, proficiencySkillLevel, function(error) {
            if(error) {
                response.send(error)
            }
            else {
                response.redirect("back")
            }
        })
    })
    router.post("/delete/:forUsername/:instrumentName", function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName

        proficiencyManager.deleteProficiencyForUser(username, instrumentName, function(error) {
            if(error) {
                response.send(error)
            }
            else {
                response.redirect("back")
            }
        })
    })
    router.post("/update/:forUsername/:instrumentName", function(request, response) {
        const username = request.params.forUsername
        const instrumentName = request.params.instrumentName
        const newProficiencySkillLevel = request.body.skillLevel

        proficiencyManager.updateProficiencyLevelForUser(username, instrumentName, newProficiencySkillLevel, function(error) {
            if(error) {
                response.send(error)
            }
            else {
                response.redirect("back")
            }
        })
    })
    return router
}