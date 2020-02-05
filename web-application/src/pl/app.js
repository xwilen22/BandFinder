const Express = require("express")
const Handlebars = require("express-handlebars")
const app = Express()

const AccountRouter = require("./routers/accountRouter")
const BandRouter = require("./routers/bandRouter")
const InstrumentRouter = require("./routers/instrumentRouter")

const BodyParser = require("body-parser")

const listenPort = 8080

app.use(Express.static(__dirname + "/public"))

app.set("views", "src/pl/views")

app.use(BodyParser.urlencoded({
    extended: false
}))

app.engine("hbs", Handlebars({
    defaultLayout: "main.hbs"
}))

app.use("/bands", BandRouter)
app.use("/account", AccountRouter)
app.use("/instrument", InstrumentRouter)

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

})
app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})