const { bot } = require("../..")
const action = require("../../../content/action")
const _var = require("../../../content/var")
const actionUpdate = require("../../../func/actionUpdate")
const subKeyboard = require("../../../func/keyboard/subkeyboar")
const Category = require("../../../model/category")
const Order = require("../../../model/order")
const User = require("../../../model/user")

const xarid = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const findCategory = await Category.findOne({ title: text }).populate('subCategory')
    if (findCategory?.subCategory?.length) {
        await actionUpdate(chatId, action.s12)
        const user = await User.findOne({ chatId })
        const order = await Order.findOne({ user: user._id })

        bot.sendMessage(chatId, _var.sendsubCategory, {
            reply_markup: {
                keyboard: subKeyboard(findCategory.subCategory, order ? [_var.buyurtma, _var.orderUser] : []),
                resize_keyboard: true
            }
        }) 
    } else {
        bot.sendMessage(chatId, _var.noSubCategory)
    }
}

module.exports = xarid