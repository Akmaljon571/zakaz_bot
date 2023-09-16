const { bot } = require("../..")
const { add } = require("../../../content/var")
const Order = require("../../../model/order")
const Product = require("../../../model/product")
const User = require("../../../model/user")

module.exports = async (msg) => {
    const chatId = msg.from.id
    const text = msg.data.split('::')[1]
    const findPro = await Product.findOne({ _id: text })
    const user = await User.findOne({ chatId })

    const newOrder = new Order({
        user: user._id,
        product: findPro._id
    })
    await newOrder.save()
    findPro.order.push(newOrder._id)
    await findPro.save()
    user.order.push(newOrder._id)
    await user.save()
    bot.sendMessage(chatId, add)
}