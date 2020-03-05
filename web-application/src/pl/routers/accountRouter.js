const Express = require("express")

module.exports = function ({accountManager, proficiencyManager, instrumentManager, errorGenerator}) {
    const router = Express.Router()

    //Redirects to account detail or login screen
    router.get("/", function (request, response) {
        let username = 0

        //if not logged in
        //response.redirect(`/signinup`)
        //else
        response.redirect(`/view/${username}`)
    })
    router.get("/view/:username", function (request, response, next) {
        const username = request.params.username

        accountManager.getAccountByUsername(username, function (accountError, userObject) {
            if (accountError) {
                next(accountError)
            }
            else {
                proficiencyManager.getAllProficienciesForUser(userObject.username, function(proficiencyError, proficiencies) {
                    if(proficiencyError) {
                        next(proficiencyError)
                    }
                    else {
                        const model = {
                            username: userObject.username,
                            biography: userObject.biography,
                            profilePicture: userObject.user_profile_picture,
                            proficiencies
                        }
                        response.render("userdetail.hbs", model)
                    }
                })
            }
        })
    })
    router.get("/signin", function(request, response) {
        const model = {
            showSignInPage: true
        }
        response.render("signinup.hbs", model)
    })
    router.post("/signin", function (request, response, next) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signInAccount(username, password, function (error) {
            if (error) {
                if(error.retainPage == true) {
                    const model = {
                        error,
                        showSignInPage: true
                    }
                    response.render("signinup.hbs", model)
                }
                else {
                    next(error)
                }
            }
            else {
                request.session.loggedInUsername = username
                response.redirect(`view/${username}`)
            }
        })
    })
    router.get("/logout", function (request, response) {
        request.session.loggedInUsername = null
        response.redirect("../")
    })
    router.get("/update/:username", function (request, response) {
        const username = request.params.username

        accountManager.getAccountByUsername(username, function (accountError, userObject) {
            if (accountError) {
                response.send(accountError)
            }
            else {
                proficiencyManager.getAllProficienciesForUser(userObject.username, function(proficiencyError, proficiencies) {
                    if(proficiencyError) {
                        response.send(proficiencyError)
                    }
                    else {
                        instrumentManager.getAllInstruments(function(instrumentError, instruments) {
                            if(instrumentError) {
                                response.send(instrumentError)
                            }
                            else {
                                let instrumentNames = []
                                instruments.forEach(instrumentObject => instrumentNames.push(instrumentObject.instrument_name))
                                console.log("Grillad med mos: ",instrumentNames)
                                console.log(`Proficiencies: ${proficiencies}`)
                                const model = {
                                    username: userObject.username,
                                    biography: userObject.biography,
                                    profilePicture: userObject.user_profile_picture,
                                    proficiencies,
                                    instruments:instrumentNames
                                }
                                response.render("edituser.hbs", model)
                            }
                        })
                    }
                })
            }
        })
    })
    router.post("/update/:username", function (request, response) {
        const biography = request.body.biography
        const username = request.params.username

        accountManager.updateAccountBiography(username, biography, function (error) {
            if (error) {
                response.send(error)
            }
            else {
                response.redirect(`/account/view/${username}`)
            }
        })
    })
    router.post("/delete/:username", function (request, response) {
        const username = request.params.username
        const password = request.body.password

        accountManager.deleteAccount(username, password, function (error) {
            //Do shit
        })
    })
    router.get("/signup", function(request, response) {
        const model = {
            showSignInPage: false
        }
        response.render("signinup.hbs", model)
    })
    router.post("/signup", function (request, response) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signUpAccount(username, password, function (error, createdUsername) {
            if (error) {
                response.send(error)
            }
            else {
                request.session.loggedInUsername = createdUsername
                response.redirect(`view/${createdUsername}`)
            }
        })
    })
    return router
}