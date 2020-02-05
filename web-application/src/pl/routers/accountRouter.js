const Express = require("express")
const router = Express.Router()

const AccountManager = require("./../../bll/accountManager")

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

    AccountManager.getAccountByUsername(username, function (error, userObjects) {
        if (error) {
            response.send(error)
        }
        else {
            console.log(userObjects)
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
router.get("/update/:username", function (request, response) {
    const username = request.params.username

    AccountManager.getAccountByUsername(username, function(error, userObjects){
        const userObject = userObjects[0]
        const model = {
            username: userObject.username,
            biography: userObject.biography,
            profilePicture: userObject.user_profile_picture
        }
        response.render("edituser.hbs", model)  
    })
})
router.post("/update/:username", function (request, response) {
    //ADD UPDATE DETAILS
})
router.post("/delete/:username", function (request, response) {

})
router.post("/create", function (request, response) {
    const username = request.body.username
    const password = request.body.password

    AccountManager.signUpAccount(username, password, function (error, createdUsername) {
        if (error) {
            response.send(`Error! ${error}`)
        }
        else {
            response.redirect(`view/${createdUsername}`)
        }
    })

})
module.exports = router