const express = require("express")

module.exports = function ({bandManager,bandMembershipManager,genreManager}) {
    const router = express.Router()

    //Get all
    router.get("/", function (request, response) {
        response.render("browse.hbs")
    })

    router.get("/noband", function (request, response){
        response.render("noband.hbs")
    })

    router.get("/view/:bandId", function (request, response) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (bandError, band) {
            if (bandError) {
                response.send(bandError)
            }
            else {
                bandMembershipManager.getBandMembershipByBandId(bandId,  function(membershipError, bandMembers){
                    if(membershipError){
                        response.send(membershipError)
                    }
                    else{
                        const bandObject = band
                        console.log("band object:", bandObject)
                        const model = {
                            bandMembers,
                            bandname: bandObject.band_name,
                            biography: bandObject.band_biography,
                            profilePicture: bandObject.band_profile_picture
                        }
                        response.render("banddetail.hbs", model)
                    }
                })
            }
        })
    })
    
    router.get("/browseuserbands", function(request, response) {
        const username = request.session.loggedInUsername
        bandMembershipManager.getBandMembershipByUsername(username, function(bandMembershipError, bandMemberships){
            if(bandMembershipError){
                response.send(bandMembershipError)
            }
            else{
                const model = {
                    bandMemberships
                }
                response.render("browseuserbands.hbs", model)
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
        genreManager.getAllGenres(function(error, genres){
            if(error){
                response.send(error)
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
        
        bandManager.createBand(bandname, bio, genre, maxMembers,function(bandError, bandId){
            if(bandError){
                response.send(bandError)
            }
            else{
                bandMembershipManager.createBandMembership(username, bandId, isBandLeader, function(bandMembershipError){
                    if(bandMembershipError){
                        response.send(bandMembershipError)
                    }
                    else{
                        response.redirect(`view/${bandId}`)
                    }
                })
            }
        })
    })

    return router
}