const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
dotenv.config()

const app = express()

app.use(express.json())
require('./bot')

const main = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true
        })
        .then(() => console.log('Mongoose Run'))
        .catch((error) => console.log(error))
        app.get('/', (_, res) => res.json('Aka Ishlab turibman😇'))
        app.listen(process.env.PORT, console.log('Server RUN'))
    } catch (error) {
        console.log(error)
    }
}

main()