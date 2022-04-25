// import mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017/urlshortener'

// establishing a database connection
const connection=()=>{
    return  mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

// export the connection object
module.exports = connection