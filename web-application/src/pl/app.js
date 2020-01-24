const express = require("express")
const app = express()

const listenPort = 8080

app.get("/", function(request, response) {
    response.send("my firts websit :)")
})
app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})