const express = require("express")

module.exports = function ({instrumentManager}) {
    const router = express.Router()

    router.post("/create", function (request, response) {

    })
    router.post("/delete", function (request, response) {

    })

    return router
}