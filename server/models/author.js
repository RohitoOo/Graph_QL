const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    }
})

module.exports = mogoose.model('Author', authorSchema)