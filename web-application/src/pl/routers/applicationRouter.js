const express = require("express")

module.exports = function ({ applicationManager }) {
    const router = express.Router()

    router.post("/create/:fromUsername/:toBandId", function (request, response, next) {
        const username = request.params.fromUsername
        const bandId = request.params.toBandId
        
        applicationManager.createApplication(username, bandId, function(error) {
            if(error) {
                next(error)
            }
            else {
                response.redirect("back")
            }
        })
    })
    router.post("/delete/:fromUsername/:toBandId", function (request, response, next) {
        const username = request.params.fromUsername
        const bandId = request.params.toBandId

        applicationManager.deleteApplication(username, bandId, function(error) {
            if(error) {
                next(error)
            }
            else {
                response.redirect("back")
            }
        })
    })

    return router
}