const Express = require("express")

module.exports = function ({}) {
    const router = Express.Router()

    router.get("/", function (request, response) {
        response.render("home.hbs")
    })

    return router
}