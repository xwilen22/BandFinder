module.exports = function ({variousRouter, bandRouter, accountRouter, instrumentRouter}) {
    const express = require("express")
    const handlebars = require("express-handlebars")
    const expressSession = require("express-session")
    const redis = require("redis")

    const app = express()

    /*const accountRouter = require("./routers/accountRouter")
    const bandRouter = require("./routers/bandRouter")
    const instrumentRouter = require("./routers/instrumentRouter")
    const variousRouter = require("./routers/variousRouter")*/

    const bodyParser = require("body-parser")

    const listenPort = 8080

    app.use(express.static(__dirname + "/public"))

    app.set("views", "src/pl/views")

    app.use(bodyParser.urlencoded({
        extended: false
    }))

    let redisClient = redis.createClient({
        host: "session"
    })
    const Redisstore = require("connect-redis")(expressSession)
    app.use(expressSession({
        store: new Redisstore({ client: redisClient }),
        secret: "16007340",
        saveUninitialized: false,
        resave: false
    }))
    //SESSION HANDLING
    app.use(function (request, response, next) {
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

    app.listen(listenPort, function () {
        console.log(`Listening on port ${listenPort}`)
    })

    return app
}