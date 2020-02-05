const Express = require("express")
const Handlebars = require("express-handlebars")
const ExpressSession = require("express-session")

const app = Express()

const AccountRouter = require("./routers/accountRouter")
const BandRouter = require("./routers/bandRouter")
const InstrumentRouter = require("./routers/instrumentRouter")
const VariousRouter = require("./routers/variousRouter")

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

app.use("/", VariousRouter)
app.use("/bands", BandRouter)
app.use("/account", AccountRouter)
app.use("/instrument", InstrumentRouter)

app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})