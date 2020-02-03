const express = require("express")
const handlebars = require("express-handlebars")
const app = express()

const accountRouter = require("./routers/accountRouter")
const bandRouter = require("./routers/bandRouter")
const instrumentRouter = require("./routers/instrumentRouter")

const bodyParser = require("body-parser")

const listenPort = 8080

app.use(express.static(__dirname + "/public"))

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine("hbs", handlebars({
    defaultLayout: "main.hbs"
}))

app.use("/bands", bandRouter)
app.use("/account", accountRouter)
app.use("/instrument", instrumentRouter)

app.get("/", function(request, response) {
    response.render("home.hbs")
})
app.get("/signinup", function(request, response) {
    response.render("signinup.hbs")
})
app.get("/noband", function(request, response) {
    response.render("noband.hbs")
})
app.get("/admin", function(request, response) {
//jfdlksafhkjsaf
})
app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})