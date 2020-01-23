const express = require("express")
const app = express()

const listenPort = 8080

app.get("/", function(request, response) {
    console.log("Connected!")
    response.send("wot")
})
app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})