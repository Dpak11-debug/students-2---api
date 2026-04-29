const db = require("../config/db");

exports.addSport = async (data) => {
    const sql = `
        INSERT INTO sports (roll_no, sport_name)
        VALUES (?, ?)
    `;
    return db.execute(sql, [
        data.roll_no,
        data.sport_name
    ]);
};