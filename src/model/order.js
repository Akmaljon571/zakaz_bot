const { Schema, model } = require('mongoose')

const Order = new Schema({
    lakatsiya: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Order', Order)
