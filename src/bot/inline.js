const { bot } = require(".")
const _action = require("../content/action")
const order = require("./helper/order")

bot.on("callback_query", async (msg) => {
    const text = msg.data.split('::')[0]

    if (text == _action.s13) {
        await order(msg) 
    }
})