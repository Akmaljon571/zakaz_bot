const action = require('../content/action')
const _var = require('../content/var')
const Category = require('../model/category')
const Product = require('../model/product')
const subCategory = require('../model/subCategory')
const user = require('../model/user')
const age = require('./helper/registr/age')
const comeBack = require('./helper/back')
const contact = require('./helper/registr/contact')
const gender = require('./helper/registr/gender')
const menu = require('./helper/menu')
const name = require('./helper/registr/name')
const start = require('./helper/registr/start')
const xarid = require('./helper/category/xarid')
const { bot } = require('./index')
const setting = require('./helper/setting/setting')
const updateName = require('./helper/setting/updateName')
const updateAge = require('./helper/setting/updateAge')
const updatePhone = require('./helper/setting/updatePhone')
const updateGender = require('./helper/setting/updateGender')
const sub = require('./helper/category/sub')

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const findUser = await user.findOne({ chatId }).lean()
    
    if (text == '/start') {
        await start(msg)
    } else if (findUser) {
        if (text == _var.back) {
            await comeBack(chatId)
        } else if (findUser.action == action.s1 && !findUser.name) {
            await name(msg)
        } else if (findUser.action == action.s2 && !findUser.age) {
            await age(msg)
        } else if (findUser.action == action.s3 && !findUser.phone) {
            await contact(msg)
        } else if (findUser.action == action.s4 && !findUser.gender) {
            await gender(msg)
        } else if (findUser.action == action.s5) {
            await menu(msg)
        } else if (findUser.action == action.s6) {
            await setting(msg)
        } else if (findUser.action == action.s7) {
            await updateName(msg)
        } else if (findUser.action == action.s8) {
            await updateAge(msg)
        } else if (findUser.action == action.s9) {
            await updatePhone(msg)
        } else if (findUser.action == action.s10) {
            await updateGender(msg)
        } else if (findUser.action == action.s11) {
            await xarid(msg)
        } else if (findUser.action == action.s12) {
            await sub(msg)
        }
    }       
})






// if (text) {
//     const category = await Category.findOne({title: "Test"})
//     const newSub = new subCategory({
//         title: text,
//         category: category._id
//     })
//     await newSub.save();
//     category.subCategory.push(newSub);
//     await category.save()
// }
//     New SubCategory


// if(text) {
//     const newCategory = new Category({
//         title: text
//     })
//     await newCategory.save()
// }
// New Category yasash