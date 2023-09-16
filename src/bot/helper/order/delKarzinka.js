const Order = require("../../../model/order")
const Product = require("../../../model/product")
const SubCategory = require("../../../model/subCategory")
const User = require("../../../model/user")
const karzinka = require("./karzinka")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const price = msg.text.split(" so'm❌")[0].split(' - ').at(-1).split(' ').join('')
    const title = msg.text.split(" so'm❌")[0].split(' - ').slice(0, -1)
    const findSub = await SubCategory.findOne({ title })
    const findProduct = await Product.find({ subCategory: findSub._id })

    const findPro = findProduct.find(e => e.price == price)
    const findUser = await User.findOne({ chatId })
    const del = await Order.findOneAndDelete({ user: findUser._id, product: findPro._id })

    findUser.order = findUser.order.filter(e => String(e) !== String(del._id))
    await User.findByIdAndUpdate(findUser._id, findUser)

    findPro.order = findPro.order.filter(e => String(e) !== String(del._id))
    await Product.findByIdAndUpdate(findPro._id, findPro)

    await karzinka(msg)
}