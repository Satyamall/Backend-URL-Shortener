
// import express package(commonJS syntax)
const express = require('express')

// instatiate the express app  
const app = express()
const cors=require("cors");
const PORT = process.env.PORT || 5000
// Listen for incoming requests
const urlrouter= require("./router/urlrouter")

// Database config
const connection = require('./config/db.config')

app.use(cors());
// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
app.use('/', urlrouter);

const start= async ()=>{
    await connection();
    app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))
}

module.exports = start;