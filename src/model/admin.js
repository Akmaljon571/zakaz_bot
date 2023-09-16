const { Schema, model } = require('mongoose')

const Admin = new Schema({
    chatId: String,
    role: String,
    name: String
})

module.exports = model('Admin', Admin)
