const Express = require("express")

module.exports = function ({accountManager}) {
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

        accountManager.getAccountByUsername(username, function (errors, userObjects) {
            if (errors.length > 0) {
                response.send(errors)
            }
            else {
                const userObject = userObjects[0]
                const model = {
                    username: userObject.username,
                    biography: userObject.biography,
                    profilePicture: userObject.user_profile_picture
                }
                response.render("userdetail.hbs", model)
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

        accountManager.getAccountByUsername(username, function (errors, userObjects) {
            if (errors.length > 0) {
                response.send(errors)
            }
            else {
                const userObject = userObjects[0]
                const model = {
                    username: userObject.username,
                    biography: userObject.biography,
                    profilePicture: userObject.user_profile_picture
                }
                response.render("edituser.hbs", model)
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