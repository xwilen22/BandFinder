const express = require("express")
const handlebars = require("express-handlebars")
const expressSession = require("express-session")
const connectSQLite3 = require("connect-sqlite3")

const app = express()

const accountRouter = require("./routers/accountRouter")
const bandRouter = require("./routers/bandRouter")
const instrumentRouter = require("./routers/instrumentRouter")
const variousRouter = require("./routers/variousRouter")

const bodyParser = require("body-parser")

const listenPort = 8080

app.use(express.static(__dirname + "/public"))

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
    extended: false
}))

const SQLiteStore = connectSQLite3(expressSession)
app.use(expressSession({
    store: new SQLiteStore({db: "session-db.db"}),
    secret: "16007340",
    saveUninitialized: false,
    resave: false
}))
//SESSION HANDLING
app.use(function(request, response, next) {
    response.locals.loggedInUsername = request.session.loggedInUsername
    next()
})

app.engine("hbs", handlebars({
    defaultLayout: "main.hbs"
}))

app.use("/", variousRouter)
app.use("/bands", bandRouter)
app.use("/account", accountRouter)
app.use("/instrument", instrumentRouter)

app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})