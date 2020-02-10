const Express = require("express")
const router = Express.Router()

const accountManager = require("./../../bll/accountManager")

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

    accountManager.getAccountByUsername(username, function (error, userObjects) {
        if (error) {
            response.send(error)
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
router.post("/signin", function(request, response) {
    const username = request.body.username
    const password = request.body.password

    accountManager.signInAccount(username, password, function(error) {
        if(error) {
            response.send(error)
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

    accountManager.getAccountByUsername(username, function(error, userObjects){
        if (error) {
            response.send("ERRORE: Can't find requested user")
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

    accountManager.updateAccountBiography(username, biography, function(error) {
        if(error.length > 0) {
            response.send(error)
        }
        else {
            response.redirect("back")
        }
    })
})
router.post("/delete/:username", function (request, response) {
    const username = request.params.username
    const password = request.body.password

    accountManager.deleteAccount(username, password, function(error) {
        //Do shit
    })
})
router.post("/create", function (request, response) {
    const username = request.body.username
    const password = request.body.password

    accountManager.signUpAccount(username, password, function (error, createdUsername) {
        if (error) {
            response.send(`Error! ${error}`)
        }
        else {
            request.session.loggedInUsername = createdUsername
            response.redirect(`view/${createdUsername}`)
        }
    })
})
module.exports = router