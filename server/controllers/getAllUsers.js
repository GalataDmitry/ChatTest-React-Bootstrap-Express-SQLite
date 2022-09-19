const db = require('../DB')

const getAllUsers = async (req, res) => {
    try {
        await db.all(`SELECT name, id FROM users`,
            (_, data) => {
                return res.send(data).status(200)
            })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = getAllUsers