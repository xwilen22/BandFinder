const Express = require("express")
const Handlebars = require("express-handlebars")
const ExpressSession = require("express-session")
const ConnectSQLite3 = require("connect-sqlite3")

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

const SQLiteStore = ConnectSQLite3(ExpressSession)
app.use(ExpressSession({
    store: new SQLiteStore({db: "session-db.db"}),
    secret: "16007340",
    saveUninitialized: false,
    resave: false
}))

app.use(function(request, response, next) {
    response.locals.loggedInUsername = request.session.loggedInUsername
    next()
})

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