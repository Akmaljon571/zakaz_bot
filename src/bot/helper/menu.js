const { bot } = require('../index')
const User = require('../../model/user');
const _var = require('../../content/var');
const actionUpdate = require('../../func/actionUpdate');
const action = require('../../content/action');
const categoryKeyboard = require('../../func/keyboard/sendMenu');
const settingKeyboard = require('../../func/keyboard/settingKeyboard');

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (text == _var.category) {
        await actionUpdate(chatId, action.s11)

        bot.sendMessage(chatId, _var.sendCategory, {
            reply_markup: {
                keyboard: await categoryKeyboard(),
                resize_keyboard: true
            }
        })
    } else if (text == _var.setting) {
        await actionUpdate(chatId, action.s6)

        bot.sendMessage(chatId, _var.sendSetting, {
            reply_markup: {
                keyboard: await settingKeyboard(chatId),
                resize_keyboard: true
            }
        })
    } else if (text == _var.about) {
        bot.sendMessage(chatId, _var.sendAdmin)
    }
}