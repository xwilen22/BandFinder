const Express = require("express")

module.exports = function ({accountManager, proficiencyManager, instrumentManager, errorGenerator, sessionValidation}) {
    const router = Express.Router()
    //Get All
    router.get("/", function (request, response) {

    })
    //Create
    router.post("/", function(request, response) {
       
    })
    //Get user
    router.get("/:username", function (request, response, next) {
        
    })
    //Get access token
    router.post("/tokens", function (request, response, next) {
        
    })
    //Update user
    router.put("/:username", function (request, response, next) {
        
    })
    //Delete user
    router.delete("/:username", function (request, response) {
        
    })
    return router
}