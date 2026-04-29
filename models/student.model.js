const db = require("../config/db");

exports.createStudent = async (data) => {
    const sql = `
        INSERT INTO students (roll_no, name, age, gender, father, mother)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return db.execute(sql, [
        data.roll_no,
        data.name,
        data.age,
        data.gender,
        data.father,
        data.mother
    ]);
};

exports.getAllStudents = async () => {
    return db.execute("SELECT * FROM students");
};