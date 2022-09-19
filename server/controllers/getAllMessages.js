const db = require('../DB')

const getAllMessages = async (req, res) => {

    const {currentPage} = req.body
    let count
    let messagesCountForWeek
    let minusDay
    let newWeekDate
    const countOnPage = 5
    const offset = countOnPage * currentPage
    const date = new Date()
    const dateFor = new Date()
    let datesForTables = [{date: date.toISOString().slice(0, 10), messCount: 0}]
    const currentDate = new Date().toISOString().slice(0, 10)
    const minusWeek = date.setDate(date.getDate() - 7)
    const pastDate = new Date(minusWeek).toISOString().slice(0, 10)

    for (let i = 1; i <= 7; i++) {
        minusDay = dateFor.setDate(dateFor.getDate() - 1)
        newWeekDate = new Date(minusDay).toISOString().slice(0, 10)
        datesForTables.push({date: newWeekDate, messCount: 0})
    }

    try {
        await db.all(`SELECT messages.created_at FROM messages `,
            async (_, data) => {
                data
                count = data.length
                for (let i = 0; i <= datesForTables?.length - 1; i++) {
                    for (let j = 0; j <= data?.length - 1; j++) {
                        if (datesForTables[i]?.date === data[j]?.created_at) datesForTables[i]['messCount']++
                    }
                }
                // for (let i = 0; i <= data?.length - 1; i++) {
                //     let _date = data[i].created_at
                //     datesForTables[_date]['messCount']++
                // }
                await db.all(`SELECT COUNT(*) as count FROM messages WHERE created_at <= '${currentDate}' AND created_at >= '${pastDate}'`,
                    async (_, data) => {
                        messagesCountForWeek = data
                        await db.all(`SELECT users.name, messages.message, messages.created_at, messages.image_name FROM users JOIN messages ON users.id=messages.message_id ORDER BY messages.id DESC LIMIT 5 OFFSET '${offset}'`,
                            (_, data) => {
                                res.send({data, count, countOnPage, messagesCountForWeek, datesForTables}).status(200)
                            })
                    })
            })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = getAllMessages