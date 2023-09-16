const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const User = require("../../../model/user")

const name = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    
    const findUser = await User.findOne({ chatId }).lean()
    findUser.action = action.s2
    findUser.name = text
    await User.findByIdAndUpdate(findUser._id, findUser, { new: true })

    bot.sendMessage(chatId, _var.age, {
        reply_markup: {
            remove_keyboard: true
        }
    })
}

module.exports = name