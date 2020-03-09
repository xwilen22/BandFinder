const express = require("express")

const expressHandlebars = require("express-handlebars")
const handlebars = require("handlebars")

const expressSession = require("express-session")
const redis = require("redis")
const csurf = require("csurf")

const bodyParser = require("body-parser")
const app = express()
const csrfProtection = csurf({cookie: false})

const listenPort = 8080

app.use(express.static(__dirname + "/pl/public"))

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
    extended: false
}))

let redisClient = redis.createClient({
    host:"session"
})
const Redisstore = require("connect-redis")(expressSession)
app.use(expressSession({
    store: new Redisstore({client: redisClient}),
    secret: "16007340",
    saveUninitialized: false,
    resave: false
}))

const awilix = require("awilix")
///DATA ACCESS LAYER
const dalSources = {
    MYSQL:"dal",
    SEQUELIZE:"dalseq"
}
const dalSource = dalSources.SEQUELIZE

const proficiencyRepository = require(`./${dalSource}/proficiencyRepository`)
const accountRepository = require(`./${dalSource}/accountRepository`)
const instrumentRepository = require(`./${dalSource}/instrumentRepository`)
const genreRepository = require(`./${dalSource}/genreRepository`)
const bandMembershipRepository = require(`./${dalSource}/bandMembershipRepository`)
const bandRepository = require(`./${dalSource}/bandRepository`)
const applicationRepository = require(`./${dalSource}/applicationRepository`)
const database = require(`./${dalSource}/db`)
///BUSINESS LOGIC LAYER
const accountManager = require("./bll/accountManager")
const passwordManager = require("./bll/passwordManager")
const bandMembershipManager = require("./bll/bandMembershipManager")
const bandManager = require("./bll/bandManager")
const bandValidation = require("./bll/bandValidation")
const sessionValidation = require("./bll/sessionValidation")
const accountValidation = require("./bll/accountValidation")
const errorGenerator = require("./bll/errorGenerator")
const genreManager = require("./bll/genreManager")
const proficiencyManager = require("./bll/proficiencyManager")
const instrumentManager = require("./bll/instrumentManager")
const proficiencyValidation = require("./bll/proficiencyValidation")
const genreValidation = require("./bll/genreValidation")
const applicationManager = require("./bll/applicationManager")
///PRESENTATION LAYER
const accountRouter = require("./pl/routers/accountRouter")
const instrumentRouter = require("./pl/routers/instrumentRouter")
const bandRouter = require("./pl/routers/bandRouter")
const variousRouter = require("./pl/routers/variousRouter")
const proficiencyRouter = require("./pl/routers/proficiencyRouter")
const applicationRouter = require("./pl/routers/applicationRouter")

const container = awilix.createContainer()
//High level dependency, these needs to be registered first
container.register("errorGenerator", awilix.asFunction(errorGenerator))
container.register("db", awilix.asFunction(database))
container.register("bandValidation", awilix.asFunction(bandValidation))

container.register("passwordManager", awilix.asFunction(passwordManager))
container.register("accountValidation", awilix.asFunction(accountValidation))
container.register("sessionValidation", awilix.asFunction(sessionValidation))

container.register("instrumentRepository", awilix.asFunction(instrumentRepository))
container.register("instrumentManager", awilix.asFunction(instrumentManager))
container.register("instrumentRouter", awilix.asFunction(instrumentRouter))

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

container.register("proficiencyRepository", awilix.asFunction(proficiencyRepository))
container.register("proficiencyManager", awilix.asFunction(proficiencyManager))
container.register("proficiencyValidation", awilix.asFunction(proficiencyValidation))

container.register("proficiencyRouter", awilix.asFunction(proficiencyRouter))
const theProficiencyRouter = container.resolve("proficiencyRouter")

const theAccountRouter = container.resolve("accountRouter")
const theInstrumentRouter = container.resolve("instrumentRouter")

container.register("genreValidation", awilix.asFunction(genreValidation))
container.register("genreRepository", awilix.asFunction(genreRepository))
container.register("genreManager", awilix.asFunction(genreManager))

container.register("applicationRepository", awilix.asFunction(applicationRepository))
container.register("applicationManager", awilix.asFunction(applicationManager))
container.register("applicationRouter", awilix.asFunction(applicationRouter))

const theApplicationRouter = container.resolve("applicationRouter")

container.register("bandMembershipManager", awilix.asFunction(bandMembershipManager))
container.register("bandMembershipRepository", awilix.asFunction(bandMembershipRepository))
container.register("bandRepository", awilix.asFunction(bandRepository))
container.register("bandManager", awilix.asFunction(bandManager))
container.register("bandRouter", awilix.asFunction(bandRouter))

const theBandRouter = container.resolve("bandRouter")

container.register("variousRouter", awilix.asFunction(variousRouter))

const theVariousRouter = container.resolve("variousRouter")

app.use("*", csrfProtection, function(request, response, next) {
    request.session.csrfToken = request.csrfToken()
    next()
})

//SESSION HANDLING
app.use(function(request, response, next) {
    response.locals.loggedInUsername = request.session.loggedInUsername
    response.locals.csrfToken = request.session.csrfToken
    next()
})

app.use(csrfProtection)

app.use("/", theVariousRouter)
app.use("/bands", theBandRouter)
app.use("/account", theAccountRouter)
app.use("/instruments", theInstrumentRouter)
app.use("/proficiencies", theProficiencyRouter)
app.use("/applications", theApplicationRouter)

app.use(function(error, request, response, next) {	
    console.log(error)
    response.render("error.hbs", error)
})

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

handlebars.registerHelper('compare', function (leftVal, comparision, rightVal) {
    console.log("HELPER VALS: " , leftVal, rightVal)
    switch (comparision.toString()) {
		case ">":
			return (leftVal > rightVal)
		case "<":
			return (leftVal < rightVal)
		case "==":
			return (leftVal == rightVal)
		case ">=":
			return (leftVal >= rightVal)
		case "<=":
            return (leftVal <= rightVal)
        case "&&":
            return (leftVal && rightVal)
        case "||":
            return (leftVal || rightVal)
		default:
			console.log("HANDLEBARS ERROR! Invalid operator in compare")
	}
})


app.use(function(errorModel, request, response, next) {
    if(errorModel != undefined || errorModel != null) {
        response.status(errorModel.code).render("error.hbs", errorModel)
    }
    else {
        const fatalModel = errorGenerator.getInternalError(`UNHANDLED ERROR! A NULL ERROR MODEL RETRIEVED`)
        response.status(fatalModel.code).render("error.hbs", fatalModel)
    }
})

app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})
