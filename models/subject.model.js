const db = require("../config/db");

exports.addSubjects = async (data) => {
    const sql = `
        INSERT INTO subjects (roll_no, tamil, english, maths, science, social)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return db.execute(sql, [
        data.roll_no,
        data.tamil,
        data.english,
        data.maths,
        data.science,
        data.social
    ]);
};