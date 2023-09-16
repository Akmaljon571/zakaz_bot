const action = require('../../../content/action')
const _var = require('../../../content/var')
const actionUpdate = require('../../../func/actionUpdate')
const mainKeyboard = require('../../../func/keyboard/mainKeyboard')
const { menuKeyboard } = require('../../../func/keyboard/sendMenu')
const User = require('../../../model/user')
const { bot } = require('../../index')

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const findUser = await User.findOne({ chatId }).lean()
    if (!findUser) {
        const newUser = new User({
            action: action.s1,
            chatId,
            createAt: new Date(),
            userName: msg.from.username || undefined
        })
        await newUser.save()
        bot.sendMessage(chatId, _var.start, { 
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else {
        if (!findUser.name) {
            bot.sendMessage(chatId, _var.start, { 
                reply_markup: {
                    remove_keyboard: true
                }
            })
        } else if (!findUser.age) {
            bot.sendMessage(chatId, _var.age, {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        } else if (!findUser.phone) {
            bot.sendMessage(chatId, _var.textSendPhone, {
                reply_markup: {
                    keyboard: [[{ text: _var.sendPhone, request_contact: true }]],
                    resize_keyboard: true
                }
            })
        } else if (!findUser.gender) {
            bot.sendMessage(chatId, _var.sendGender, {
                reply_markup: {
                    keyboard: [
                        [_var.genderE, _var.genderA]
                    ],
                    resize_keyboard: true
                }
            })
        } else {
            await actionUpdate(chatId, action.s5)
            bot.sendMessage(chatId, _var.sendMenu + ' ' +  findUser.name, {
                reply_markup: {
                    keyboard: mainKeyboard(),
                    resize_keyboard: true
                }
            })
        }
    }
}