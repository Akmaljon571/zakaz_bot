const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const actionUpdate = require("../../../func/actionUpdate")
const settingText = require("../../../func/settingText")

const setting = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (settingText(text) === _var.updateName) {
        await actionUpdate(chatId, action.s7)

        bot.sendMessage(chatId, _var.sendUpdateName, {
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else if (settingText(text) === _var.updateAge) {
        await actionUpdate(chatId, action.s8)

        bot.sendMessage(chatId, _var.age, {
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else if (settingText(text) === _var.updatePhone) {
        await actionUpdate(chatId, action.s9)
        
        bot.sendMessage(chatId, _var.textSendPhone, {
            reply_markup: {
                keyboard: [[{ text: _var.sendPhone, request_contact: true }]],
                resize_keyboard: true
            }
        })
    } else if (settingText(text) === _var.updateGender) {
        await actionUpdate(chatId, action.s10)

        bot.sendMessage(chatId, _var.sendGender, {
            reply_markup: {
                keyboard: [
                    [_var.genderE, _var.genderA]
                ],
                resize_keyboard: true
            }
        })
    }
}

module.exports = setting