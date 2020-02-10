const Express = require("express")

module.exports = function ({}) {
    const router = Express.Router()

    router.get("/", function (request, response) {
        response.render("home.hbs")
    })
    router.get("/signinup", function (request, response) {
        response.render("signinup.hbs")
    })
    router.get("/noband", function (request, response) {
        response.render("noband.hbs")
    })
    router.get("/admin", function (request, response) {

    })

    return router
}