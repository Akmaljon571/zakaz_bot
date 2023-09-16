const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const mainKeyboard = require("../../../func/keyboard/mainKeyboard")
const User = require("../../../model/user")

const gender = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    
    const findUser = await User.findOne({ chatId }).lean()
    findUser.action = action.s5
    findUser.gender = text == _var.genderE ? "Erkak" : "Ayol"
    await User.findByIdAndUpdate(findUser._id, findUser, { new: true })

    bot.sendMessage(chatId, _var.sendMenu  + ' ' + findUser.name, {
        reply_markup: {
            keyboard: mainKeyboard(),
            resize_keyboard: true
        }
    })
}

module.exports = gender