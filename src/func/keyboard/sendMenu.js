const _var = require("../../content/var")
const { back } = require("../../content/var")
const Category = require("../../model/category")
const User = require("../../model/user")

const categoryKeyboard = async (chatId) => {
    const category = await Category.find().lean()
    const user = await User.findOne({ chatId }).populate('order')

    const a = [user?.order?.length ? [_var.buyurtma, _var.orderUser] : []]
    for (let i = 0; i < category.length; i++) {
        a.push([category[i]?.title, category[i++]?.title ? category[i]?.title : null].filter(e => e))
    }
    if (a.length % 2 === 0) {
        a.at(-1).push(back)
    } else {
        a.push([back])
    }
    return a
}

module.exports = categoryKeyboard