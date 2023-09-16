const { bot } = require("../..")
const _action = require("../../../content/action")
const _var = require("../../../content/var")
const actionUpdate = require("../../../func/actionUpdate")
const summa = require("../../../func/summa")
const Order = require("../../../model/order")
const Product = require("../../../model/product")
const SubCategory = require("../../../model/subCategory")
const User = require("../../../model/user")

module.exports = async (msg) => {
    const chatId = msg.chat.id

    const user = await User.findOne({ chatId }).populate('order')
    const orders = user.order
    let a = "Sizning Mahsulotlaringiz: \n\n"
    const keyboard = []
    let jami = 0
    for (let i = 0; i < orders.length; i++) {
        const product = await Product.findOne({ _id: orders[i].product })
        const sub = await SubCategory.findOne({ _id: product.subCategory })
        a += `_${i + 1}_. *${sub.title}*
        _${product.olchov}_ - ${summa(product.price)}so'm \n`
        if (i % 2 === 0) {
            keyboard.push([`${sub.title} - ${summa(product.price)}so'm❌`])
        } else {
            keyboard.at(-1).push(`${sub.title} - ${summa(product.price)}so'm❌`)
        }
        jami += Number(product.price)
    }
    keyboard.push([_var.buyurtma, _var.back])
    await actionUpdate(chatId, _action.s15)
    a += `\n\nUmmumiy: ${summa(jami)} so'm`
    bot.sendMessage(chatId, a, { 
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard,
            resize_keyboard: true
        }
    })
}