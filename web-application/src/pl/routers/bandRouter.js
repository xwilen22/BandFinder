const express = require("express")
const router = express.Router()

//Get all
router.get("/", function(request, response) {
    response.render("browse.hbs")
})

router.get("/view/:bandname", function(request, response) {
    response.render("banddetail.hbs")
})

router.post("/delete/:bandname", function(request, response) {
    
})

router.get("/update/:bandname", function(request, response) {
    response.render("manageband.hbs")
})

router.post("/update/:bandname", function(request, response) {

})
router.post("/create", function(request, response) {
    response.render("manageband.hbs")
})
module.exports = router