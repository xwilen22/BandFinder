const express = require("express")
const router = express.Router()

const accountManager = require("./../../bll/accountManager")

//Redirects to account detail or login screen
router.get("/", function (request, response) {
    let username = 0

    //if not logged in
    //response.redirect(`/signinup`)
    //else
    response.redirect(`account/view/${username}`)
})
router.get("/view/:username", function (request, response) {
    let username = request.params.username

    accountManager.getAccountByUsername(username, function (error, userObject) {
        if (error) {
            response.send("eror")
        }
        else {
            const model = {
                username: userObject.username,
                biography: userObject.biography,
                profilePicture: userObject.user_profile_picture
            }
            response.render("userdetail.hbs", model)
        }
    })
})
router.get("/update/:username", function (request, response) {
    response.render("edituser.hbs")
})
router.post("/delete/:username", function (request, response) {

})
router.post("/update/:username", function (request, response) {

})
router.post("/create", function (request, response) {
    const username = request.body.username
    const password = request.body.password

    accountManager.signUpAccount(username, password, function (error, createdUsername) {
        if (error) {
            response.send(error)
        }
        else {
            response.redirect(`account/view/${createdUsername}`)
        }
    })

})
module.exports = router