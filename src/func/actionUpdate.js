const User = require("../model/user")

const actionUpdate = async (chatId, action) => {
    const findUser = await User.findOne({ chatId }).lean()
    findUser.action = action
    await User.findByIdAndUpdate(findUser._id, findUser, { new: true })
}

module.exports = actionUpdate