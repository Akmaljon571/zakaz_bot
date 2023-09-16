const { category, setting, about } = require("../../content/var")

const mainKeyboard = () => {
    return [
        [category],
        [about, setting]
    ]
}

module.exports = mainKeyboard