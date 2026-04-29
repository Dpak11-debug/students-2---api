const db = require("../config/db");

exports.getFullReport = async () => {
    const sql = `
        SELECT 
            s.roll_no, s.name, s.age, s.gender,
            sub.tamil, sub.english, sub.maths, sub.science, sub.social,
            att.total_days, att.present_days,
            sp.sport_name
        FROM students s
        LEFT JOIN subjects sub ON s.roll_no = sub.roll_no
        LEFT JOIN attendance att ON s.roll_no = att.roll_no
        LEFT JOIN sports sp ON s.roll_no = sp.roll_no
    `;
}
exports.getCricketPlayers = async () => {
    const sql = `
        SELECT 
            s.roll_no, s.name, s.age, s.gender,
            sub.tamil, sub.english, sub.maths, sub.science, sub.social,
            att.total_days, att.present_days,
            sp.sport_name
        FROM students s
        LEFT JOIN subjects sub ON s.roll_no = sub.roll_no
        LEFT JOIN attendance att ON s.roll_no = att.roll_no
        LEFT JOIN sports sp ON s.roll_no = sp.roll_no
        WHERE sp.sport_name = 'Cricket'
    `;

    return db.execute(sql);
};


