const  mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    authorId: {
        type: Number
    }

})
module.exports = mongoose.model('Book', bookSchema)