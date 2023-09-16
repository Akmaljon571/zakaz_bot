const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const settingKeyboard = require("../../../func/keyboard/settingKeyboard")
const User = require("../../../model/user")

const updatePhone = async (msg) => {
    const chatId = msg.chat.id
    const phone = msg?.contact?.phone_number
    const text = msg.text

    if (phone) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.phone = phone
        findUser.action = action.s6
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
        bot.sendMessage(chatId, _var.sendSetting, {
            reply_markup: {
                keyboard: await settingKeyboard(chatId),
                resize_keyboard: true
            }
        })
    } else if (text.split('+998')[1]?.length == 9) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.phone = text
        findUser.action = action.s6
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
        bot.sendMessage(chatId, _var.sendSetting, {
            reply_markup: {
                keyboard: await settingKeyboard(chatId),
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.errorPhone)
        bot.sendMessage(chatId, _var.textSendPhone, {
            reply_markup: {
                keyboard: [[{ text: _var.sendPhone, request_contact: true }]],
                resize_keyboard: true
            }
        })
    }
}

module.exports = updatePhone