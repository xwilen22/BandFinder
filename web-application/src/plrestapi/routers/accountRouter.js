const Express = require("express")

module.exports = function ({accountManager, proficiencyManager, instrumentManager, errorGenerator, sessionValidation}) {
    const router = Express.Router()

    //Redirects to account detail or login screen
    router.get("/", function (request, response) {

    })
    router.get("/view/:username", function (request, response, next) {
        
    })
    router.get("/signin", function(request, response) {
        
    })
    router.post("/signin", function (request, response, next) {
        
    })
    router.get("/logout", function (request, response) {
        
    })
    router.get("/update/:username", function (request, response, next) {
       
    })
    router.post("/update/:username", function (request, response, next) {
        
    })
    router.post("/delete/:username", function (request, response) {
        
    })
    router.get("/signup", function(request, response) {
       
    })
    router.post("/signup", function (request, response, next) {
        
    })
    return router
}