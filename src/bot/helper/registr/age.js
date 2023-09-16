const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const User = require("../../../model/user")

const age = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    
    if (Number(text) && 10 < Number(text) && Number(text) < 70) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.action = action.s3
        findUser.age = text
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })

        bot.sendMessage(chatId, _var.textSendPhone, {
            reply_markup: {
                keyboard: [[{ text: _var.sendPhone, request_contact: true }]],
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.errorAge)
    }
}

module.exports = age