const db = require("../config/db");

exports.addAttendance = async (data) => {
    const sql = `
        INSERT INTO attendance (roll_no, total_days, present_days)
        VALUES (?, ?, ?)
    `;
    return db.execute(sql, [
        data.roll_no,
        data.total_days,
        data.present_days
    ]);
};