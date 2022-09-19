const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./router')
const app = express()

const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('images'))
app.listen(PORT, (error) => {
    error ?
        console.log(error) :
        console.log(`server run on port ${PORT}`)
})
app.use('/api', router)

