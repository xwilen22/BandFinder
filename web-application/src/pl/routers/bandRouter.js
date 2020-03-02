const express = require("express")

module.exports = function ({bandManager,bandMembershipManager}) {
    const router = express.Router()

    //Get all
    router.get("/", function (request, response) {
        response.render("browse.hbs")
    })

    router.get("/view/:bandId", function (request, response) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (error, band) {
            if (error) {
                console.log("hejehejehje")
                response.send(error)
            }
            else {
                const bandObject = band
                const model = {
                    bandname: bandObject.band_name,
                    biography: bandObject.band_biography,
                    profilePicture: bandObject.band_profile_picture
                }
                response.render("banddetail.hbs", model)
            }
        })
    })

    router.post("/delete/:bandname", function (request, response) {

    })

    router.get("/update/:bandname", function (request, response) {
        response.render("manageband.hbs")
    })

    router.post("/update/:bandname", function (request, response) {

    })

    router.get("/create", function (request, response) {
        response.render("manageband.hbs")
    })

    router.post("/create", function (request, response) {
        const bandname = request.body.bandNameText
        const username = request.session.loggedInUsername
        const bio = request.body.bioText
        const isBandLeader = true
        const genre = "Empty"
        const maxMembers = 5
        bandManager.createBand(bandname, bio, genre, maxMembers,function(error, bandId){
            bandMembershipManager.createBandMembership(username, bandId, isBandLeader, function(error){
                if(error){
                    console.log("HE HEJ")
                    response.send(error)
                }
                else{
                    console.log("Does it get here")
                    response.redirect(`/view/${bandId}`)
                }
            })
        })
    })

    return router
}