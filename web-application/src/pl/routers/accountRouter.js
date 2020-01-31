const express = require("express")
const router = express.Router()

//Redirects to account detail or login screen
router.get("/", function(request, response) {
    let username = 0

    //if not logged in
    response.render("signinup.hbs")
    //else
    response.redirect(`view/${username}`)
})
router.get("view/:username", function(request, response) {

})
router.post("delete/:username", function(request, response) {
    
})
router.post("update/:username", function(request, response) {

})
router.post("create", function(request, response) {

})
module.exports = router