const _var = require("../../content/var")
const User = require("../../model/user")

const settingKeyboard = async (chatId) => {
    const findUser = await User.findOne({ chatId }).lean()

    return [
        [_var.updateName+`(${findUser.name})`, _var.updateAge+`(${findUser.age})`],
        [_var.updatePhone+`(${findUser.phone})`],
        [_var.updateGender+`(${findUser.gender})`],
        [_var.back]
    ]
}

module.exports = settingKeyboard