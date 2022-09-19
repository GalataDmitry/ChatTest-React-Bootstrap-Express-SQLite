const Router = require('express')
const {v4: uuidv4} = require('uuid')
const multer = require("multer")
const getAllMessages = require('./controllers/getAllMessages')
const getAllUsers = require('./controllers/getAllUsers')
const sendMessages = require('./controllers/sendMessage')

const router = new Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage})

router.post('/get_all_messages', multer().none(), getAllMessages)
router.get('/get_all_users', getAllUsers)
router.post('/send_message', upload.single('img'), sendMessages)

module.exports = router