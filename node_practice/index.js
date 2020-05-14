const express = require("express")
const path = require("path")
const logger = require("./logger")
const exphbs = require("express-handlebars")
const members = require("./Members")

const app = express()

// app.use(logger)

// Handlebars Middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

// Homepage Route
app.get("/", (request, response) => {
    response.render("index", {
        title: "Member App",
        members
    })
})

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")))

// Members API Routes
app.use("/api/members", require("./routes/api/members"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))