const Express = require("express")
const adminPassword = "$2b$10$HhNGA6nmc1i4j.6J.gUUm.SJurOj3Ac6JnGUyEuiKe3TUa0jmg3fe"
const adminName = "Foo"

module.exports = function ({instrumentManager, errorGenerator, sessionValidation, passwordManager,genreManager}){
    const router = Express.Router()
    router.get("/", function(request, response){
        response.redirect("admin/login")
    })
    router.get("/login", function(request, response){
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
                    request.session.loggedInUsername = adminNameIn
                    response.redirect("dashboard")
                }
            })
        }
        else{
            next(errorGenerator.getClientError("Wrong Username"))
        }
    })
    router.get("/dashboard", function(request,response,next){
        loggedInUsername = request.session.loggedInUsername
        if(loggedInUsername == adminName){
            genreManager.getAllParentGenres(function(error,parentGenres){
                if(error){
                    next(error)
                }
                else{
                    const model={
                        parentGenres
                    }
                    response.render("admindashboard.hbs", model)
                }
            })
        }
        else{
            next(errorGenerator.getHttpCodeError(401))
        }
    })
    router.post("/creategenre", function(request,response,next){
        parentGenreName = request.body.genreText
        genreManager.createGenre(parentGenreName, function(error){
            if (error){
                next(error)
            }
            else{
                response.redirect("dashboard")
            }
        })
    })
    router.post("/createsubgenre", function(request,response,next){
        parentGenreName = request.body.parentGenre
        subGenreName = request.body.subGenreText
        genreManager.createSubGenreOf(parentGenreName, subGenreName, function(error){
            if (error){
                next(error)
            }
            else{
                response.redirect("dashboard")
            }
        })
    })
    router.post("/createinstrument", function(request,response){
        instrumentName = request.body.instrumentText
        instrumentManager.createInstrument(instrumentName, function(error){
            if(error){
                next(error)
            }
            else{
                response.redirect("dashboard")
            }
        })
    })
    return router
}