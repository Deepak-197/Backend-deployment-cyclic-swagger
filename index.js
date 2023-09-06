const express = require("express")
const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { connection } = require("./config/db")
const {userRouter} = require("./routes/User.route")
require("dotenv").config()


const app = express()
app.use(express.json())


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Learning Swagger",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJSdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use("/users", userRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to the DB")
    } catch (err) {
        console.log(err)
    }
    console.log(`Running at port ${process.env.port}`)
})