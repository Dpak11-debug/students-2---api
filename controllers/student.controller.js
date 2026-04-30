const Student = require("../models/student.model");
const Subject = require("../models/subject.model");
const Attendance = require("../models/attendance.model");
const Sports = require("../models/sports.model");

exports.createStudentFull = async (req, res) => {
    try {
        const body = req.body;

        // CASE 1: MULTIPLE STUDENTS (ARRAY)
        if (Array.isArray(body)) {
            for (let item of body) {
                const rollNo = item.student.roll_no;

                await Student.createStudent(item.student);
                await Subject.addSubjects({ ...item.subjects, roll_no: rollNo });
                await Attendance.addAttendance({ ...item.attendance, roll_no: rollNo });
                await Sports.addSport({ ...item.sports, roll_no: rollNo });
            }

            return res.json({ message: "Bulk students inserted successfully" });
        }

        // CASE 2: SINGLE STUDENT
        const rollNo = body.student.roll_no;

        await Student.createStudent(body.student);
        await Subject.addSubjects({ ...body.subjects, roll_no: rollNo });
        await Attendance.addAttendance({ ...body.attendance, roll_no: rollNo });
        await Sports.addSport({ ...body.sports, roll_no: rollNo });

        res.json({ message: "Student inserted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const [data] = await Student.getAllStudents();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMaleStudents = async (req, res) => {
    try {
        const [data] = await Student.getMaleStudents();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFemaleStudents = async (req, res) => {
    try {
        const [data] = await Student.getFemaleStudents();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const Report = require("../models/report.model");

exports.getPassStudents = async (req, res) => {
    try {
        const [rows] = await Report.getFullReport();

        const result = rows.filter(s =>
            s.tamil >= 35 &&
            s.english >= 35 &&
            s.maths >= 35 &&
            s.science >= 35 &&
            s.social >= 35
        ).map(s => {
            const attendance_percentage = s.total_days && s.total_days > 0 ? (s.present_days / s.total_days) * 100 : 0;
            return { ...s, attendance_percentage: Math.round(attendance_percentage * 100) / 100 };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFailStudents = async (req, res) => {
    try {
        const [rows] = await Report.getFullReport();

        const result = rows.filter(s =>
            s.tamil < 35 ||
            s.english < 35 ||
            s.maths < 35 ||
            s.science < 35 ||
            s.social < 35
        ).map(s => {
            const attendance_percentage = s.total_days && s.total_days > 0 ? (s.present_days / s.total_days) * 100 : 0;
            return { ...s, attendance_percentage: Math.round(attendance_percentage * 100) / 100 };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopperStudents = async (req, res) => {
    try {
        const [rows] = await Report.getFullReport();

        const result = rows.filter(s => {
            const total = s.tamil + s.english + s.maths + s.science + s.social;
            const percentage = (total / 500) * 100;

            return percentage >= 90;
        }).map(s => {
            const attendance_percentage = s.total_days && s.total_days > 0 ? (s.present_days / s.total_days) * 100 : 0;
            return { ...s, attendance_percentage: Math.round(attendance_percentage * 100) / 100 };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCricketPlayers = async (req, res) => {
    try {
        const [rows] = await Report.getCricketPlayers();

        const result = rows.map(s => {
            const attendance_percentage = s.total_days && s.total_days > 0 ? (s.present_days / s.total_days) * 100 : 0;
            return { ...s, attendance_percentage: Math.round(attendance_percentage * 100) / 100 };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};