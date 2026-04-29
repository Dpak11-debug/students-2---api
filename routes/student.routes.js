const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");

router.post("/add", controller.createStudentFull);
router.get("/all", controller.getStudents);
router.get("/pass", controller.getPassStudents);
router.get("/fail", controller.getFailStudents);
router.get("/topper", controller.getTopperStudents);
router.get("/cricket", controller.getCricketPlayers);

module.exports = router;