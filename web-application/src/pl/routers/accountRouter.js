const express = require("express")
const router = express.Router()

const accountManager = require("./../../bll/accountManager")

//Redirects to account detail or login screen
router.get("/", function(request, response) {
    let username = 0

    //if not logged in
    //response.redirect(`/signinup`)
    //else
    response.redirect(`account/view/${username}`)
})
router.get("/view/:username", function(request, response) {
    let username = request.params.username
    response.render("userdetail.hbs")
})
router.get("/update/:username", function(request, response) {
    response.render("edituser.hbs")
})
router.post("/delete/:username", function(request, response) {
    
})
router.post("/update/:username", function(request, response) {

})
router.post("/create", function(request, response) {
    const username = request.body.username
    const password = request.body.password

    accountManager.signUpAccount(username, password, function(error, username) {
        if(error) {
            response.send("Get fucked")
        }
        else {
            accountManager.
            response.render("userdetail.hbs")
        }
    })
    
})
module.exports = router