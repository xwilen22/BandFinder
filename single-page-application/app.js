const express = require("express")

const app = express(express.static("public"))

app.use(function(request, response, next){
	response.sendFile(__dirname+"/public/index.html")
})

app.listen(3030)