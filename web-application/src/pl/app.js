const express = require("express")
const handlebars = require("express-handlebars")
const app = express()

const listenPort = 8080

app.set("views", "src/pl/views")

app.engine("hbs", handlebars({
    defaultLayout: "main.hbs"
}))

app.get("/", function(request, response) {
    response.render("home.hbs")
})
//dsafsafas
app.listen(listenPort, function() {
    console.log(`Listening on port ${listenPort}`)
})