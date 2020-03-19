const express = require("express")
const multer = require("multer")

module.exports = function ({bandManager, bandMembershipManager, genreManager, sessionValidation, applicationManager, errorGenerator}) {
    const router = express.Router()

    //Get all
    router.get("/", function (request, response, next) {
        const sessionUsername = request.session.loggedInUsername
        bandManager.getAllBands(function(retrieveError, bands) {
            if(retrieveError) {
                next(retrieveError)
            }
            else {
                bandMembershipManager.getBandMembershipByUsername(sessionUsername, function(membershipError, memberships) {
                    if(membershipError) {
                        next(membershipError)
                    }
                    else {
                        applicationManager.getApplicationsByUsername(sessionUsername, function(applicationError, applications) {
                            if(applicationError) {
                                next(applicationError)
                            }
                            else {
                                genreManager.getAllGenres(function(genreError, genres) {
                                    if(genreError) {
                                        next(genreError)
                                    }
                                    else {
                                        const model = {
                                            bands,
                                            memberships,
                                            applications,
                                            genres
                                        }
                                        response.render("browse.hbs", model)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
    router.get("/search?:query", function(request, response, next) {
        const bandName = request.query.bandName
        const genreName = request.query.genreName
        const sessionUsername = request.session.loggedInUsername
        bandManager.searchAndGetBandByTitleAndGenre(bandName, genreName, function(retrieveError, foundBands) {
            if(retrieveError) {
                next(retrieveError)
            }
            else {
                bandMembershipManager.getBandMembershipByUsername(sessionUsername, function(membershipError, memberships) {
                    if(membershipError) {
                        next(membershipError)
                    }
                    else {
                        applicationManager.getApplicationsByUsername(sessionUsername, function(applicationError, applications) {
                            if(applicationError) {
                                next(applicationError)
                            }
                            else {
                                genreManager.getAllGenres(function(genreError, genres) {
                                    if(genreError) {
                                        next(genreError)
                                    }
                                    else {
                                        const model = {
                                            bands: foundBands,
                                            memberships,
                                            applications,
                                            genres,
                                            bandName,
                                            genreName
                                        }
                                        response.render("browse.hbs", model)
                                    }
                                })
                            }
                        })
                    }
                }) 
            }
        })
    })

    router.get("/noband", function (request, response){
        response.render("noband.hbs")
    })

    router.get("/view/:bandId", function (request, response, next) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (bandError, band) {
            if (bandError) {
                next(bandError)
            }
            else {
                bandMembershipManager.getBandMembershipByBandId(bandId,  function(membershipError, bandMembers){
                    if(membershipError){
                        next(bandError)
                    }
                    else {
                        applicationManager.getApplicationsByBandId(bandId, function (applicationError, bandApplications) {
                            if (applicationError) {
                                next(applicationError)
                            }
                            else {
                                const currentUsername = request.session.loggedInUsername
                                const bandObject = band
                                const isCurrentUserBandLeader = sessionValidation.validateCurrentUserBandLeader(bandMembers, currentUsername)
                                
                                const model = {
                                    bandMembers,
                                    bandId: bandObject.id,
                                    bandname: bandObject.band_name,
                                    biography: bandObject.band_biography,
                                    bandGenre: bandObject.band_genre,
                                    profilePicture: bandObject.band_profile_picture,
                                    bandApplications,
                                    isCurrentUserBandLeader
                                }

                                response.render("banddetail.hbs", model)
                            }                                                                                                       
                        })
                    }
                })
            }
        })
    })
    
    router.get("/browseuserbands", function(request, response, next) {
        const username = request.session.loggedInUsername
        bandMembershipManager.getBandMembershipByUsername(username, function(bandMembershipError, bandMemberships){
            if(bandMembershipError){
                next(bandMembershipError)
            }
            else {
                const model = {
                    bandMemberships
                }
                response.render("browseuserbands.hbs", model)
            }
        })
    })
    
    router.post("/delete/:bandId", function (request, response, next) {
        const bandId = request.params.bandId
        bandMembershipManager.getBandMembershipByBandId(bandId, function (membershipError, bandMembers) {
            if (membershipError) {
                response.send(membershipError)
            }
            else {
                const validated = sessionValidation.validateCurrentUserBandLeader(bandMembers, request.session.loggedInUsername)
                console.log(validated)
                if (validated == true) {
                    bandManager.deleteBand(bandId, function (bandError) {
                        if (bandError) {
                            response.send(bandError)
                        }
                        else {
                            response.redirect("/bands/browseuserbands")
                        }
                    })
                }
                else {
                    next(errorGenerator.getHttpCodeError(401))
                }
            }
        })
    })
    router.get("/update/:bandId", function (request, response, next) {
        const bandId = request.params.bandId
        bandManager.getBandById(bandId, function (bandError, band) {
            if (bandError) {
                next(bandError)
            }
            else{
                genreManager.getAllGenres(function(error,genres){
                    bandObject = band
                    
                    const model = {
                        bandId: bandObject.id, 
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
    const bandImageUpload = multer({
        dest: "../public/images/profile",
        limits: {
            fileSize: 10000000, //1mb filesize limit upon upload
            fieldNameSize: 50 //50 characters limit on filename
        },
        fileFilter: function (request, file, callback) {
            if (file.mimetype != "image/png" && file.mimetype != "image/gif" && file.mimetype != "image/jpeg") {
                validationError = new Error("Unsupported filetype!");
                request.fileValidationError = validationError.message;
                return callback(validationError, false)
            }
            return callback(null, true)
        }
    })
    let bandProfileImageUpload = bandImageUpload.single("bandProfile")
    router.post("/update/:bandId", bandProfileImageUpload, function (request, response, next) {
        const bandId = request.params.bandId
        const bandname = request.body.bandNameText
        const bio = request.body.bioText
        const genre = request.body.genre
        console.log(bandname, bio, genre)
        if(request.body._csrf != request.session.csrfToken) {
            console.log("Hello? ", request.body._csrf, "!=" , request.session.csrfToken)
            next({
                code: "EBADCSRFTOKEN"
            })
            return
        }
        bandMembershipManager.getBandMembershipByBandId(bandId, function (membershipError, bandMembers) {
            if (membershipError) {
                response.send(membershipError)
            }
            else {
                const validated = sessionValidation.validateCurrentUserBandLeader(bandMembers, request.session.loggedInUsername)
                if (validated == true) {
                    bandManager.updateBandById(bandId, bio, bandname, genre, function (bandError, bandId) {
                        if (bandError) {
                            response.send(bandError)
                        }
                        else {
                            response.redirect(`/bands/view/${bandId}`)
                        }
                    })
                }
                else {
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
    router.post("/create", bandProfileImageUpload, function (request, response, next) {
        const bandname = request.body.bandNameText
        const username = request.session.loggedInUsername
        const bio = request.body.bioText
        const isBandLeader = true
        const genre = request.body.genre
        const maxMembers = 5
        console.log(bandname, username, bio)
        if(request.body._csrf != request.session.csrfToken) {
            console.log("Hello? ", request.body._csrf, "!=" , request.session.csrfToken)
            next({
                code: "EBADCSRFTOKEN"
            })
            return
        }

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
    router.post("/addmember/:forBandId", function(request, response, next) {
        const username = request.body.username
        const bandId = request.params.forBandId
        const isBandLeader = false
        //username, bandId, callback
        applicationManager.deleteApplication(username, bandId, function(applicationError) {
            if(applicationError) {
                next(applicationError)
            }
            else {
                bandMembershipManager.createBandMembership(username, bandId, isBandLeader, function(bandMembershipError) {
                    if(bandMembershipError) {
                        next(bandMembershipError)
                    }
                    else {
                        response.redirect("back")
                    }
                })
            }
        })
    })
    router.post("/removemember/:forBandId/:username", function(request, response, next) {
        const username = request.params.username
        const bandId = request.params.forBandId

        bandMembershipManager.deleteBandMembership(username, bandId, function(error) {
            if(error) {
                next(error)
            }
            else {
                response.redirect("back")
            }
        })
    })

    return router
}