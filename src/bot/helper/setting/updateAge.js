const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const settingKeyboard = require("../../../func/keyboard/settingKeyboard")
const User = require("../../../model/user")

const updateAge = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (Number(text) && 10 < Number(text) && Number(text) < 70) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.age = text
        findUser.action = action.s6
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
        bot.sendMessage(chatId, _var.sendSetting, {
            reply_markup: {
                keyboard: await settingKeyboard(chatId),
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.errorAge)
    }
}

module.exports = updateAge