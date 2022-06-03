const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title : String,
    author : String, 
    gender : String,
    picture : String
})


module.exports = mongoose.model('book', schema)