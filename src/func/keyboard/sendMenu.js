const { back } = require("../../content/var")
const Category = require("../../model/category")

const categoryKeyboard = async () => {
    const category = await Category.find().lean()
    // const order = await 

    // Order table yasaladi. song Order table chiqsa 1chi Buyurtma berish va karzinka    bolimlari boladi. karzinka ichida user sotib olgan barcha mahsulotlar X bolib chiqadi holasa ochiradi holasa polni tozalab tashlaydi savatga kirganda savat ichidagi mahsulot soni va Ummumiy summa chiqib keladi
    const a = []
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