const express = require("express")

module.exports = function ({ proficiencyManager }) {
    const router = express.Router()

    router.post("/create/:forUsername", function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.body.instrument
        const proficiencySkillLevel = request.body.skillLevel

        console.log("CREATING PROF: ", username, instrumentName, proficiencySkillLevel)

        proficiencyManager.createProficiency(username, instrumentName, proficiencySkillLevel, function(errors) {
            if(errors.length > 0) {
                response.send(errors)
            }
            else {
                response.redirect("back")
            }
        })
    })
    router.post("/delete/:forUsername", function (request, response) {
        const username = request.params.forUsername
        const instrumentName = request.body.instrument

        proficiencyManager.deleteProficiencyForUser(username, instrumentName, function(errors) {
            if(errors.length > 0) {
                response.send(errors)
            }
            else {
                response.send("back")
            }
        })
    })

    return router
}