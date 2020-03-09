const Express = require("express")
const adminPassword = "$2b$10$HhNGA6nmc1i4j.6J.gUUm.SJurOj3Ac6JnGUyEuiKe3TUa0jmg3fe"
const adminName = "Foo"
module.exports = function ({accountManager, proficiencyManager, instrumentManager, errorGenerator, sessionValidation,passwordManager}){
    const router = Express.Router()
    router.get("/", function(request, response){
        response.render("adminlogon.hbs")
    })
    router.post("/login", function(request, response, next){
        passwordIn = request.body.adminPassword
        adminNameIn = request.body.adminName
        if(adminName == adminNameIn){
            passwordManager.comparePasswordPlainToHash(passwordIn,adminPassword,function(error, success){
                if(error){
                    next(error)
                }
                else{
                    console.log(success)
                    response.redirect("admindashboard")
                }
            })
        }
        else{
            next(errorGenerator.getClientError("Wrong Username"))
        }
    })
    return router
}