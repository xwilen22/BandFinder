const express = require("express")
const handlebars = require("express-handlebars")
const app = express()

const listenPort = 8080

app.use(express.static(__dirname + "/public"))

app.set("views", "src/pl/views")

app.engine("hbs", handlebars({
    defaultLayout: "main.hbs"
}))

app.get("/", function(request, response) {
    response.render("home.hbs")
})
app.get("/signinup", function(request, response) {
    response.render("signinup.hbs")
})
app.get("/account", function(request, response) {
    response.render("userdetail.hbs")
})
app.get("/band/?", function(request, response) {
    response.render("banddetail.hbs")
})
app.get("/browse", function(request, response) {
    response.render("browse.hbs")
})
app.get("/noband", function(request, response) {
    response.render("noband.hbs")
})

app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})