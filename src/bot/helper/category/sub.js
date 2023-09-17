const { bot } = require("../..");
const _action = require("../../../content/action");
const { s13 } = require("../../../content/action");
const { noSub } = require("../../../content/var");
const actionUpdate = require("../../../func/actionUpdate");
const summa = require("../../../func/summa");
const SubCategory = require("../../../model/subCategory");

const sub = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split('. ').slice(1).join(' ')

    const findSub = await SubCategory.findOne({ title: text }).populate('product')
    const img = `https://api.telegram.org/bot${process.env.TOKEN}/getFile?file_id=${findSub.img}`
    if (findSub.product?.length) {
        let a = ''
        findSub.product.map((e, i) => a += `\n${i + 1}. Narxi: ${summa(e?.price)} so'm`)
        bot.sendPhoto(chatId, findSub.img, {
        reply_markup: {
            inline_keyboard: [
                findSub.product.map(e => {
                    return {
                        text: e.olchov, 
                        callback_data: s13 + '::' + e._id
                    }
                })
            ],
        },
        caption: `💈 ${findSub.title} \n${a}`})
    } else {
        bot.sendMessage(chatId, noSub)
    }
}

module.exports = sub