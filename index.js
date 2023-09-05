const express = require('express');
const connection = require("./config/db");
const {userRouter} = require("./routes/User.route")
const {noteRouter} = require("./routes/Note.route")
const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({origin:"*"}))                                   //{origin:"*"} put it if not getting response

app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)


app.listen(process.env.port, async() => {

    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Trouble Connecting to the DB")
        console.log(err)
    }

    console.log(`Server is running at port ${process.env.port}`)
})