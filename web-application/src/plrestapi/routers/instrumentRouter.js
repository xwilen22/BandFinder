const express = require("express")

module.exports = function ({instrumentManager}) {
    const router = express.Router()
    //Get all
    router.get("/", function (request, response) {

    })
    //Create
    router.post("/", function (request, response) {

    })
    //Delete
    router.post("/delete", function (request, response) {

    })

    return router
}