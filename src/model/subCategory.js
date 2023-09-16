const { Schema, model } = require('mongoose')

const subCategory = new Schema({
    title: String,
    img: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = model('subCategory', subCategory)
