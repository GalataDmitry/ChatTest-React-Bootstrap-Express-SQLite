const db = require('../DB')

const sendMessage = async (req, res, next) => {
    const {areaData, currentUserId} = req.body
    const uploadImage = req?.file?.filename
    try {
        await db.run(`INSERT INTO messages(message, message_id, image_name) VALUES('${areaData}', '${currentUserId}', '${uploadImage}')`,
            async () => {
                return res.sendStatus(200)
            })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = sendMessage