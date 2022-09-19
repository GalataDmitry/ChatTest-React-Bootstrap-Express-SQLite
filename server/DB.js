const sqlite3 = require('sqlite3').verbose()

     const db = new sqlite3.Database('./chatDB.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
        err ? console.log('ERROR -->', err) : console.log('connected to DB successful')
    })
    //db.run(`CREATE TABLE messages(id INTEGER UNIQUE PRIMARY KEY, message TEXT NOT NULL, message_id INTEGER NOT NULL, created_at DATE DEFAULT CURRENT_DATE, image_name TEXT, FOREIGN KEY(message_id) REFERENCES users(id))`)
    // db.run(`DROP TABLE messages`)
module.exports = db