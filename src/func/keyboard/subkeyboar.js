const { back } = require("../../content/var")

const subKeyboard = (array, order) => {
    const a = [order]
    for (let i = 1; i <= array.length; i++) {
        a.push([`${i}. ${array[i - 1]?.title}`, array[i++] ? `${i}. ${array[i - 1]?.title}` : null].filter(e => e))
    }
    if (a.length % 2 === 0) {
        a.at(-1).push(back)
    } else {
        a.push([back])
    }
    return a
}

module.exports = subKeyboard