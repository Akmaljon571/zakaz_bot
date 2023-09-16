const { bot } = require("../..")
const _action = require("../../../content/action")
const _var = require("../../../content/var")
const actionUpdate = require("../../../func/actionUpdate")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    await actionUpdate(chatId, _action.s14)

    bot.sendMessage(chatId, _var.lakatsita, {
        reply_markup: {
            keyboard: [
                [{
                    text: _var.sendlakatsiya,
                    request_location: true
                }],
                [_var.back]
            ],
            resize_keyboard: true
        }
    })
}