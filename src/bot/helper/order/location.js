const { bot } = require("../..")
const { agar } = require("../../../content/var")
const { tez, rahmat } = require("../../../content/var")
const summa = require("../../../func/summa")
const Admin = require("../../../model/admin")
const Product = require("../../../model/product")
const SubCategory = require("../../../model/subCategory")
const User = require("../../../model/user")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const location = msg?.location
    const admins = await Admin.find()
    
    admins.map((_, i) => {
        bot.sendMessage(admins[i].chatId, '///////////////////////////////////')
    })
    const user = await User.findOne({ chatId }).populate('order')
    const orders = user.order
    let a = "User Mahsulotlari \nTekshirib tez orada aloqaga chiqing. Kutib otribdi🎬: \n\n"
    let jami = 0
    for (let i = 0; i < orders.length; i++) {
        const product = await Product.findOne({ _id: orders[i].product })
        const sub = await SubCategory.findOne({ _id: product.subCategory })
        a += `_${i + 1}_. *${sub.title}*
        _${product.olchov}_ - ${summa(product.price)}so'm \n`
        jami += Number(product.price)
    }
    a += `\n\nUmmumiy: ${summa(jami)} so'm`
    const b = `👨‍💻Ismi: ${user.name} \n\n🕑Yoshi: ${user.age} \n\n📞 Aloqa: ${user.phone} \n\n👑 Jinsi: ${user.gender}`

    for (let i = 0; i < admins.length; i++) {
        bot.sendMessage(admins[i].chatId, b)
        bot.sendMessage(admins[i].chatId, a, {parse_mode: 'Markdown'})
        bot.sendLocation(admins[i].chatId, location.latitude, location.longitude);
    }
    bot.sendMessage(chatId, a, {parse_mode: 'Markdown'})
    bot.sendMessage(chatId, rahmat + user.name + '! \n' + tez)
    bot.sendMessage(chatId, agar)
}