const express = require("express")

module.exports = function ({ instrumentManager }) {
    const router = express.Router()
    //Get all
    router.get("/", function (request, response) {
        instrumentManager.getAllInstruments(function(error, instruments) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(200).json(instruments)
            }
        })
    })
    router.get("/:instrumentName", function (request, response) {
        const instrumentName = request.params.instrumentName

        instrumentManager.getInstrumentByName(instrumentName, function(error, instrument) {
            if(error) {
                response.status(error.code).end()
            }
            else {
                response.status(200).json(instrument)
            }
        })
    })
    return router
}