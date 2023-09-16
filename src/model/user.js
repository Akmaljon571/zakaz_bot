const { Schema, model } = require('mongoose')

const User = new Schema({
    chatId: Number,
    name: String,
    age: Number,
    phone: String,
    gender: String,
    action: String,
    createAt: Date,
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

module.exports = model('User', User)