const sessionValidation = require("sesssionValidation")

function createBand(accountname, bandName, bandInfo){
    if(sessionValidation.validateAccountnameInSession == true){
        //callback(bandId)
    }
    else{
        //callback(errorUnauthorized)
    }
}

function getBandById(bandId, callback){
    const bandId = parseInt(bandId)
    if(isNaN(bandId) == false){
        //callback(error,bandId)
    }
}

function getAllBands(callback){
    //callback(error,bands)
}

function searchAndGetBandByTitleOrGenre(bandname, genre){
    //callback(error,bands)
}

function updateBand(bandId,accountname, bandInfo, bandName){
    if(sessionValidation.validateAccountnameInSession == true){
        //callback(error, bandId)
    }
    else{
        //callback(errorUnauthorized)
    }
}

function deleteBand(bandId, accountname, bandInfo, bandName){
    if(sessionValidation.validateAccountnameInSession == true){
        //callback(error, id)
    }
    else{
        //callback(errorUnauthorized)
    }
}
