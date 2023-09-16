const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const settingKeyboard = require("../../../func/keyboard/settingKeyboard")
const User = require("../../../model/user")

const updateName = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    const findUser = await User.findOne({ chatId }).lean()
    findUser.name = text
    findUser.action = action.s6
    await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
    bot.sendMessage(chatId, _var.sendSetting, {
        reply_markup: {
            keyboard: await settingKeyboard(chatId),
            resize_keyboard: true
        }
    })
}

module.exports = updateName