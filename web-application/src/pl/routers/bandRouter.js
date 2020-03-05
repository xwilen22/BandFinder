const express = require("express")

module.exports = function ({bandManager,bandMembershipManager,genreManager, sessionValidation, errorGenerator}) {
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
                    else {
                        const currentUsername = request.session.loggedInUsername
                        const bandObject = band
                        const isCurrentUserBandLeader = sessionValidation.validateCurrentUserBandLeader(bandMembers,currentUsername)
                        const model = {
                            bandMembers,
                            bandId: bandObject.id,
                            bandname: bandObject.band_name,
                            biography: bandObject.band_biography,
                            profilePicture: bandObject.band_profile_picture,
                            isCurrentUserBandLeader
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

    router.get("/update/:bandId", function (request, response) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (bandError, band) {
            if (bandError) {
                response.send(bandError)
            }
            else{
                genreManager.getAllGenres(function(error,genres){
                    bandObject = band
                    model={ 
                        bandname: bandObject.band_name,
                        biography: bandObject.band_biography,
                        profilePicture: bandObject.band_profile_picture,
                        genres
                    }
                    response.render("manageband.hbs", model)
                })
            }
        })
    })
    router.post("/update/:bandId", function (request, response, next) {
        const bandId = request.params.bandId
        const bandname = request.body.bandNameText
        const bio = request.body.bioText
        const genre = request.body.genre
        bandMembershipManager.getBandMembershipByBandId(bandId, function(membershipError, bandMembers){
            if(membershipError){
                response.send(membershipError)
            }
            else{
                const validated = sessionValidation.validateCurrentUserBandLeader(bandMembers, request.session.loggedInUsername)
                console.log("was is dis: ", validated)
                if(validated==true){
                    bandManager.updateBandById(bandId, bandname, bio, genre, function(bandError, bandId){
                        if(bandError){
                            response.send(bandError)
                        }
                        else{
                            response.redirect(`view/${bandId}`)
                        }
                    })
                }
                else{
                    next(errorGenerator.getHttpCodeError(401))
                }
            }
        })
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