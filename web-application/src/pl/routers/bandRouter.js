const express = require("express")

module.exports = function ({bandManager,bandMembershipManager,genreManager}) {
    const router = express.Router()

    //Get all
    router.get("/", function (request, response) {
        response.render("browse.hbs")
    })

    router.get("/view/:bandId", function (request, response) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (errors, band) {
            if (errors.length > 0) {
                response.send(errors)
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
        genreManager.getAllGenres(function(errors, genres){
            if(errors.length > 0){
                response.send(errors)
            }
            else{
                const model = {
                    genres
                }
                console.log(genres)
                response.render("manageband.hbs", model)
            }
        })
        
    })

    router.post("/create", function (request, response) {
        const bandname = request.body.bandNameText
        const username = request.session.loggedInUsername
        const bio = request.body.bioText
        const isBandLeader = true
        const genre = request.body.genre
        const maxMembers = 5
        console.log("Genre is:", genre)
        bandManager.createBand(bandname, bio, genre, maxMembers,function(bandErrors, bandId){
            if(bandErrors.length > 0){
                response.send(bandErrors)
            }
            else{
                bandMembershipManager.createBandMembership(username, bandId, isBandLeader, function(membershipErrors){
                    if(membershipErrors.length > 0){
                        console.log("Genre is:", genre)
                        response.send(membershipErrors)
                    }
                    else{
                        console.log("Does it get here")
                        response.redirect(`/view/${bandId}`)
                    }
                })
            }
        })
    })

    return router
}