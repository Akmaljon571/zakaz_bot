const { bot } = require('../../index')
const User = require('../../../model/user');
const _var = require('../../../content/var');
const action = require('../../../content/action');

module.exports = async (msg) => {
    const chatId = msg.chat.id;
    const phone = msg?.contact?.phone_number
    const text = msg.text

    if (phone) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.phone = phone
        findUser.action = action.s4
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
        bot.sendMessage(chatId, _var.sendGender, {
            reply_markup: {
                keyboard: [
                    [_var.genderE, _var.genderA]
                ],
                resize_keyboard: true
            }
        })
    } else if (text.split('+998')[1]?.length == 9) {
        const findUser = await User.findOne({ chatId }).lean()
        findUser.phone = text
        findUser.action = action.s4
        await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
        bot.sendMessage(chatId, _var.sendGender, {
            reply_markup: {
                keyboard: [
                    [_var.genderE, _var.genderA]
                ],
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