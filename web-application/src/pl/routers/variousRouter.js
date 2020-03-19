const Express = require("express")

module.exports = function ({ bandManager }) {
    const router = Express.Router()

    router.get("/", function (request, response, next) {
        bandManager.getAllBands(function(error, bands) {
            if(error) {
                next(error)
            }
            else {
                const model = {
                    bands
                }
                response.render("home.hbs", model)
            }
        })
    })

    return router
}