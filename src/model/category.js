const { Schema, model } = require('mongoose')

const Category = new Schema({
    title: String,
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'subCategory'
    }]
})

module.exports = model('Category', Category)
