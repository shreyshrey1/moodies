const sqlite3 = require("sqlite3").verbose();


const getTextMessages = () => {
    const db = new sqlite3.Database('./chat.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to chat database");
    })
    let sql = `SELECT text text,
                date date
                FROM message`
    return db.all(sql, [], (err, rows) => {
        return rows;
    })
    // await db.serialize(() => {
    //     db.each(`SELECT text as Text,
    //                     date as Date
    //              FROM message`, async (err, row) => {
    //       if (err) {
    //         console.error(err.message);
    //       }
    //       await res.concat([row.Date, row.Text])
    //     });
    // });
    // return res;
}

console.log(getTextMessages());
module.exports = {
    getTextMessages
}