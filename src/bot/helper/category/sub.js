const { bot } = require("../..")
const SubCategory = require("../../../model/subCategory");

const sub = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split('. ').slice(1).join(' ')

    const findSub = await SubCategory.findOne({ title: text }).populate('product')
    
    // fetch(`https://api.telegram.org/bot${process.env.ADMIN_TOKEN}/getFile?file_id=${findSub.img}`, {
    //     method: "POST",
    //     headers:{'Content-Type': 'multipart/form-data'}
    // })
    // .then(re => re.json())
    // .then(data => {
    //     bot.sendPhoto(chatId, `https://api.telegram.org/bot${process.env.ADMIN_TOKEN}/getFile?file_id=${findSub.img}`)
    // })
    bot.sendPhoto(chatId, `https://api.telegram.org/bot${process.env.ADMIN_TOKEN}/getFile?file_id=${findSub.img}`)
}

module.exports = sub