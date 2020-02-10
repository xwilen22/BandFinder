//Jag har ingen aning om vad jag håller på med :^)
const awilix = require("awilix")

const proficiencyRepository = require("./dal/proficiencyRepository")
const accountRepository = require("./dal/accountRepository")
const accountManager = require("./bll/accountManager")
const accountRouter = require("./pl/routers/accountRouter")

const passwordManager = require("./bll/passwordManager")
const accountValidation = require("./bll/accountValidation")

const instrumentRepository = require("./dal/instrumentRepository")
const instrumentRouter = require("./pl/routers/instrumentRouter")

const genreRepository = require("./dal/genreRepository")
const bandMembershipRepository = require("./dal/bandMembershipRepository")
const bandRepository = require("./dal/bandRepository")
const bandManager = require("./bll/bandManager")
const bandRouter = require("./pl/routers/bandRouter")

const variousRouter = require("./pl/routers/variousRouter")

const container = awilix.createContainer()
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

const theAccountRouter = container.resolve("accountRouter")

container.register("proficiencyRepository", awilix.asFunction(proficiencyRepository))

container.register("passwordManager", awilix.asFunction(passwordManager))
container.register("accountValidation", awilix.asFunction(accountValidation))

container.register("instrumentRepository", awilix.asFunction(instrumentRepository))
container.register("instrumentRouter", awilix.asFunction(instrumentRouter))

const theInstrumentRouter = container.resolve("instrumentRouter")

container.register("genreRepository", awilix.asFunction(genreRepository))
container.register("bandMembershipRepository", awilix.asFunction(bandMembershipRepository))
container.register("bandRepository", awilix.asFunction(bandRepository))
container.register("bandManager", awilix.asFunction(bandManager))
container.register("bandRouter", awilix.asFunction(bandRouter))

const theBandRouter = container.resolve("bandRouter")

container.register("variousRouter", awilix.asFunction(variousRouter))

const theVariousRouter = container.resolve("variousRouter")