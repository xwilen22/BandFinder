const Express = require("express")

module.exports = function ({accountManager, proficiencyManager, instrumentManager}) {
    const router = Express.Router()

    //Redirects to account detail or login screen
    router.get("/", function (request, response) {
        let username = 0

        //if not logged in
        //response.redirect(`/signinup`)
        //else
        response.redirect(`/view/${username}`)
    })
    router.get("/view/:username", function (request, response) {
        const username = request.params.username

        accountManager.getAccountByUsername(username, function (accountErrors, userObject) {
            if (accountErrors.length > 0) {
                response.send(accountErrors)
            }
            else {
                proficiencyManager.getAllProficienciesForUser(userObject.username, function(proficiencyErrors, proficiencies) {
                    if(proficiencyErrors.length > 0) {
                        response.send(proficiencyErrors)
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
    router.post("/signin", function (request, response) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signInAccount(username, password, function (errors) {
            if (errors.length > 0) {
                response.send(errors)
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

        accountManager.getAccountByUsername(username, function (accountErrors, userObject) {
            if (accountErrors.length > 0) {
                response.send(accountErrors)
            }
            else {
                proficiencyManager.getAllProficienciesForUser(userObject.username, function(proficiencyErrors, proficiencies) {
                    if(proficiencyErrors.length > 0) {
                        response.send(proficiencyErrors)
                    }
                    else {
                        instrumentManager.getAllInstruments(function(instrumentErrors, instruments) {
                            if(instrumentErrors.length > 0) {
                                response.send(instrumentErrors)
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

        accountManager.updateAccountBiography(username, biography, function (errors) {
            if (errors.length > 0) {
                response.send(errors)
            }
            else {
                response.redirect(`/account/view/${username}`)
            }
        })
    })
    router.post("/delete/:username", function (request, response) {
        const username = request.params.username
        const password = request.body.password

        accountManager.deleteAccount(username, password, function (errors) {
            //Do shit
        })
    })
    router.post("/create", function (request, response) {
        const username = request.body.username
        const password = request.body.password

        accountManager.signUpAccount(username, password, function (errors, createdUsername) {
            if (errors.length > 0) {
                response.send(errors)
            }
            else {
                request.session.loggedInUsername = createdUsername
                response.redirect(`view/${createdUsername}`)
            }
        })
    })
    return router
}