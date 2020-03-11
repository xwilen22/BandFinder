const express = require("express")

const app = express()

app.use(express.static(__dirname + "/public"))

app.use(function(request, response, next){
	response.sendFile(__dirname+"/public/index.html")
})

app.listen(3030, function() {
    console.log(`It's alive! At port ${3030}`)
})