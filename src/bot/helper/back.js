// Bu yerda user ni action tekshiriladi qayerda turgan bolsa undan 1 ta tepadagi action chiqib kelishi kerak yani 1 martalik ortga qaytish boladi

const { bot } = require("..")
const action = require("../../content/action")
const _var = require("../../content/var")
const actionUpdate = require("../../func/actionUpdate")
const mainKeyboard = require("../../func/keyboard/mainKeyboard")
const categoryKeyboard = require("../../func/keyboard/sendMenu")
const User = require("../../model/user")

const comeBack = async (chatId) => {
    const newUser = await User.findOne({ chatId }).lean()
    if (newUser.action == action.s6) {
        await actionUpdate(chatId, action.s5)
        bot.sendMessage(chatId, _var.sendMenu, {
            reply_markup: {
                keyboard: mainKeyboard(),
                resize_keyboard: true
            }
        })
    } else if (newUser.action == action.s11) {
        await actionUpdate(chatId, action.s5)
        bot.sendMessage(chatId, _var.sendMenu, {
            reply_markup: {
                keyboard: mainKeyboard(),
                resize_keyboard: true
            }
        })
    } else if (newUser.action == action.s12) {
        await actionUpdate(chatId, action.s11)

        bot.sendMessage(chatId, _var.sendCategory, {
            reply_markup: {
                keyboard: await categoryKeyboard(chatId),
                resize_keyboard: true
            }
        })
    }
}

module.exports = comeBack