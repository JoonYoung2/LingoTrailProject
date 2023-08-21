const router = require("express").Router();
const controller = require("../../controller/quest/questController");

router.get("/attend", controller.quest.attend);
router.get("/attend.do", controller.quest.attendDo);
router.get("/attendanceCheck", controller.quest.attendanceCheck);
module.exports=router;